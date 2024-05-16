import {
  CompanyModel,
  PlanModel,
  SystemModel,
  AccountModel,
} from '#root/models/index.js';
import { buildRes, errorHelper } from '#root/utils/index.js';
import { randomUUID } from 'crypto';
import { blockUser } from './block-company.js';
import { insertCom } from './add-company.js';
import { defAcctPass } from '#root/config/index.js';

let newPlan;
let oldPlan;

export default async (req, res) => {
  try {
    const comId = req.body.comId;
    const newPlanId = req.body.newPlanId;

    const isUgr = await checkIsUgr(comId, newPlanId);
    if (isUgr === 'E') return res.status(400).json(errorHelper('00100', req));
    if (isUgr === 'U') {
      await uptPlan(comId, newPlan, oldPlan);
    } else {
      await blockUser(comId);
      await insertCom(newPlan, newPlanId, randomUUID());
    }

    res.send(buildRes({ comId }, '00101'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

async function checkIsUgr(comId, newPlanId) {
  const comRes = await CompanyModel.getCompanyById([comId]);
  const comPlanId = comRes.rows[0].PlanID;

  const planRes = await PlanModel.getPlan();
  const planLst = planRes.rows;

  const comStorage = Number(
    planLst.find((plan) => plan.PlanID === comPlanId).Storage
  );
  const newPlanStorage = Number(
    planLst.find((plan) => plan.PlanID === newPlanId).Storage
  );

  var isUgr = '';
  if (comStorage < newPlanStorage) {
    isUgr = 'U';
    newPlan = planLst.find((plan) => plan.PlanID === newPlanId);
    oldPlan = planLst.find((plan) => plan.PlanID === comPlanId);
  } else if (comStorage > newPlanStorage) {
    isUgr = 'D';
    newPlan = comRes.rows[0].CompanyName;
  } else isUgr = 'E';

  return isUgr;
}

async function uptPlan(comId, newPlan, oldPlan) {
  const comRes = await AccountModel.getAccountUsername([comId]);
  const paddedStrCom = comRes.rows[0].Username.match(/\d+$/)[0];
  const adminIdRes = await SystemModel.getAdminId(comId);
  const admId = adminIdRes.rows[0].UserID;
  const folderIdRes = await SystemModel.getFolderId(comId);
  const folderId = folderIdRes.rows[0].FolderID;

  const newAdminAcctNum = Number(newPlan.AdminAcctNum);
  const newMgrAcctNum = Number(newPlan.MgrAcctNum);
  const newEmplAcctNum = Number(newPlan.EmplAcctNum);

  const oldAdminAcctNum = Number(oldPlan.AdminAcctNum);
  const oldMgrAcctNum = Number(oldPlan.MgrAcctNum);
  const oldEmplAcctNum = Number(oldPlan.EmplAcctNum);

  const addedAdmin = newAdminAcctNum - oldAdminAcctNum;
  const addedMgr = newMgrAcctNum - oldMgrAcctNum;
  const addedEmpl = newEmplAcctNum - oldEmplAcctNum;

  const adminUserIDs = genUuidArr(addedAdmin);
  const mgrUserIDs = genUuidArr(addedMgr);
  const staffUserIDs = genUuidArr(addedEmpl);

  const rootFolderIDs = genUuidArr(addedMgr);
  const deptIDs = genUuidArr(addedMgr);

  const adminUserNames = [];
  for (let i = oldAdminAcctNum + 1; i <= newAdminAcctNum; i++) {
    adminUserNames.push(`Admin${paddedStr(i)}_Com${paddedStrCom}`);
  }

  const mgrUserNames = [];
  for (let i = oldMgrAcctNum + 1; i <= newMgrAcctNum; i++) {
    mgrUserNames.push(`Mgr${paddedStr(i)}_Com${paddedStrCom}`);
  }

  const staffUserNames = [];
  for (let i = oldEmplAcctNum + 1; i <= newEmplAcctNum; i++) {
    staffUserNames.push(`Empl${paddedStr(i)}_Com${paddedStrCom}`);
  }

  // Update company plan
  await CompanyModel.uptPlan([comId, newPlan.PlanID]);

  // Add admin accounts
  for (let i = 0; i < addedAdmin; i++) {
    await AccountModel.addAccount([
      randomUUID(),
      adminUserNames[i],
      defAcctPass,
      comId,
    ]);
  }

  // Add mgr accounts
  for (let i = 0; i < addedMgr; i++) {
    await AccountModel.addAccount([
      randomUUID(),
      mgrUserNames[i],
      defAcctPass,
      comId,
    ]);
  }

  // Add staff accounts
  for (let i = 0; i < addedEmpl; i++) {
    await AccountModel.addAccount([
      randomUUID(),
      staffUserNames[i],
      defAcctPass,
      comId,
    ]);
  }

  // Add depts
  for (let i = 0; i < addedMgr; i++) {
    await SystemModel.addDept(comId, [
      deptIDs[i],
      `Dept${paddedStr(paddedStr(oldMgrAcctNum + i + 1))}_Com${paddedStrCom}`,
      folderId,
      1,
    ]);
  }

  // Add admin users
  for (let i = 0; i < addedAdmin; i++) {
    await SystemModel.addUser(comId, [
      adminUserIDs[i],
      adminUserNames[i],
      defAcctPass,
      adminUserNames[i],
      'Admin',
      'Active',
      null,
    ]);
  }

  // Add mgr users
  for (let i = 0; i < addedMgr; i++) {
    await SystemModel.addUser(comId, [
      mgrUserIDs[i],
      mgrUserNames[i],
      defAcctPass,
      mgrUserNames[i],
      'Manager',
      'Active',
      deptIDs[i],
    ]);
  }

  // Add staff users
  for (let i = 0; i < addedEmpl; i++) {
    await SystemModel.addUser(comId, [
      staffUserIDs[i],
      staffUserNames[i],
      defAcctPass,
      staffUserNames[i],
      'Staff',
      'Active',
      deptIDs[0],
    ]);
  }

  // Add folders
  for (let i = 0; i < addedMgr; i++) {
    await SystemModel.addFolder(comId, [
      rootFolderIDs[i],
      null,
      [],
      new Date(),
      null,
      null,
      false,
      false,
      [],
      deptIDs[i],
      admId,
      new Date(),
    ]);
  }

  // Add paths
  for (let i = 0; i < addedMgr; i++) {
    await SystemModel.addPath(comId, [rootFolderIDs[i], rootFolderIDs[i], 0]);
  }

  // Update dept root folder
  for (let i = 0; i < addedMgr; i++) {
    await SystemModel.uptRootFdr(comId, [deptIDs[i], rootFolderIDs[i]]);
  }
}

function genUuidArr(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(randomUUID());
  }
  return arr;
}

function paddedStr(num) {
  return String(num).padStart(5, '0');
}
