import {
  buildRes,
} from '#root/utils/index.js';
import { DeptModel, UserModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const deptId = req.body.userInfo.DeptID;

    const deptInfoRes = await DeptModel.getDeptById(companyId, deptId);
    const deptInfo = deptInfoRes.rows[0];

    const usersInDeptRes = await UserModel.getUsersByDeptId(companyId, deptId);
    const usersInDept = usersInDeptRes.rows;

    // Response to request
    res.send(buildRes({ deptInfo: deptInfo, usersInDept: usersInDept}));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
