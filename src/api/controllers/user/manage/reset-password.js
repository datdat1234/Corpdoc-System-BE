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

    const defaultPasswordRes = await CompanyModel.getDefaultPassById(req.body.companyId);
    const defaultPassword = await decodeItem(defaultPasswordRes.rows[0].DefaultPassword);
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(defaultPassword, salt);

    for (let i = 0; i <staffId.length; i++) {
      await UserModel.setPassword(req.body.companyId, [staffId[i], hash]);
    }

    // Response to request
    res.send(buildRes(true));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
