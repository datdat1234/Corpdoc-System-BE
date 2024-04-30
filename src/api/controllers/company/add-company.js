import {
  AccountModel,
  CompanyModel,
  PlanModel,
  SystemModel,
} from '#root/models/index.js';
import { buildRes } from '#root/utils/index.js';
import { randomUUID } from 'crypto';
import { defPass } from '#root/config/index.js';

export default async (req, res) => {
  try {
    const comName = req.body.comName;
    const planId = req.body.planId;
    const comId = randomUUID();

    await insertCom(comName, planId, comId);

    res.send(buildRes({ comId: comId }, '00099'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export async function insertCom(comName, planId, comId) {
  const plan = await PlanModel.getPlanById([planId]);
  const comRes = await CompanyModel.getCompanies();
  const companyCount = comRes.rows.length;
  const paddedStrCom = paddedStr(companyCount + 1);

  const adminAcctNum = plan.rows[0].AdminAcctNum;
  const manageAcctNum = plan.rows[0].MgrAcctNum;
  const staffAcctNum = plan.rows[0].EmplAcctNum;

  const adminUserIDs = genUuidArr(adminAcctNum);
  const mgrUserIDs = genUuidArr(manageAcctNum);
  const staffUserIDs = genUuidArr(staffAcctNum);

  const rootFolderIDs = genUuidArr(manageAcctNum);
  const deptIDs = genUuidArr(manageAcctNum);

  const adminUserNames = adminUserIDs.map(
    (id, i) => `Admin${paddedStr(i + 1)}_Com${paddedStrCom}`
  );
  const mgrUserNames = mgrUserIDs.map(
    (id, i) => `Mgr${paddedStr(i + 1)}_Com${paddedStrCom}`
  );
  const staffUserNames = staffUserIDs.map(
    (id, i) => `Empl${paddedStr(i + 1)}_Com${paddedStrCom}`
  );

  // Add company
  await CompanyModel.addCompany([
    comId,
    comName,
    defPass,
    'Active',
    null,
    planId,
  ]);

  // Add admin accounts
  for (let i = 0; i < adminAcctNum; i++) {
    await AccountModel.addAccount([
      randomUUID(),
      adminUserNames[i],
      defPass,
      comId,
    ]);
  }

  // Add mgr accounts
  for (let i = 0; i < manageAcctNum; i++) {
    await AccountModel.addAccount([
      randomUUID(),
      mgrUserNames[i],
      defPass,
      comId,
    ]);
  }

  // Add staff accounts
  for (let i = 0; i < staffAcctNum; i++) {
    await AccountModel.addAccount([
      randomUUID(),
      staffUserNames[i],
      defPass,
      comId,
    ]);
  }

  // Create db and add schema
  await SystemModel.createDb(comId);
  await SystemModel.createSchema(comId);

  // Add depts
  for (let i = 0; i < manageAcctNum; i++) {
    await SystemModel.addDept(comId, [
      deptIDs[i],
      `Dept${paddedStr(paddedStr(i + 1))}_Com${paddedStrCom}`,
      rootFolderIDs[i],
      1,
    ]);
  }

  // Add admin users
  for (let i = 0; i < adminAcctNum; i++) {
    await SystemModel.addUser(comId, [
      adminUserIDs[i],
      adminUserNames[i],
      defPass,
      adminUserNames[i],
      'Admin',
      'Active',
      null,
    ]);
  }

  // Add mgr users
  for (let i = 0; i < manageAcctNum; i++) {
    await SystemModel.addUser(comId, [
      mgrUserIDs[i],
      mgrUserNames[i],
      defPass,
      mgrUserNames[i],
      'Manager',
      'Active',
      deptIDs[i],
    ]);
  }

  // Add staff users
  for (let i = 0; i < staffAcctNum; i++) {
    await SystemModel.addUser(comId, [
      staffUserIDs[i],
      staffUserNames[i],
      defPass,
      staffUserNames[i],
      'Staff',
      'Active',
      deptIDs[0],
    ]);
  }

  // Add folders
  for (let i = 0; i < manageAcctNum; i++) {
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
      adminUserIDs[0],
      new Date(),
    ]);
  }

  // Add paths
  for (let i = 0; i < manageAcctNum; i++) {
    await SystemModel.addPath(comId, [rootFolderIDs[i], rootFolderIDs[i], 0]);
  }

  // Add constraints
  await SystemModel.createCstr(comId);
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
