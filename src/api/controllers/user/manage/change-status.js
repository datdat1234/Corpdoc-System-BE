import { validateChangePassword } from '#root/api/validators/user.validator.js';
import { errorHelper, logger, getText, buildRes } from '#root/utils/index.js';
import { UserModel, CompanyModel } from '#root/models/index.js';
import bcrypt from 'bcryptjs';
import {
  encodeItem, decodeItem
} from '#root/utils/index.js';

export default async (req, res) => {
  try {
    var logInfo = {userId: req.body.userInfo.UserID, companyId: req.body.companyId};
    const staffId = req.body.staffId;
    const crtStatus = req.body.crtStatus;

    const changeStatus = crtStatus === 'Active' ? 'Blocked' : 'Active';

    for (let i = 0; i < staffId.length; i++) {
      if (staffId[i] === logInfo.userId) continue;
      await UserModel.changeStatus(req.body.companyId, staffId[i], changeStatus);
    }


    // Response to request
    res.send(buildRes(changeStatus));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
