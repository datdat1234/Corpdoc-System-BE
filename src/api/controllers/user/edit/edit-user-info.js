import { validateChangePassword } from '#root/api/validators/user.validator.js';
import { errorHelper, logger, getText, buildRes } from '#root/utils/index.js';
import { UserModel } from '#root/models/index.js';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;

export default async (req, res) => {
  var logInfo = {userId: req.body.userInfo.UserID, companyId: req.body.companyId};
  if (req.body.oldPassword) {
    const changePassword = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword
    }
    const { error } = validateChangePassword(changePassword);
    if (error)
      return res
        .status(400)
        .json(errorHelper('00069', req, error.details[0].message, logInfo));
  }
      
  const user = await UserModel.getUserById(req.body.companyId, [req.body.userInfo.UserID]);
      
  if (user && user.rowCount) {
    const name = user.rows[0].Name;
    const password = user.rows[0].Password;

    if (req.body.oldPassword) {  

      const match = bcrypt.compareSync(req.body.oldPassword, password);
      if (!match) return res.status(500).json(errorHelper('00072', logInfo));

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);

      await UserModel.setPassword(req.body.companyId, [req.body.userInfo.UserID, hash]);
    }

    if (req.body.name && req.body.name != name) {
      await UserModel.setName(req.body.companyId, [req.body.userInfo.UserID, req.body.name]);
    }

    logger('00076', logInfo, getText('en', '00076'), 'Info', req);
    return res.status(200).json(buildRes(null, '00076'));
  
  }
};
