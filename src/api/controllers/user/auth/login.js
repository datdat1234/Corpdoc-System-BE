import { validateLogin } from '#root/api/validators/user.validator.js';
import { AccountModel } from '#root/models/index.js';
import { UserModel } from '#root/models/index.js';
import { DeptModel } from '#root/models/index.js';
import {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
  buildRes,
} from '#root/utils/index.js';
import bcrypt from 'bcryptjs';
import { convertMap } from '@smithy/smithy-client';
const { compareSync } = bcrypt;

export default async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    var logInfo = {userId:'', companyId:''};
    if (error) {
      let code = '00038';
      if (error.details[0].message.includes('username')) code = '00039';
      else if (error.details[0].message.includes('password')) code = '00040';

      return res
        .status(400)
        .json(errorHelper(code, logInfo, error.details[0].message));
    }

    const companyIds = await AccountModel.getCompanyId([req.body.username]);

    if (!companyIds || !companyIds.rowCount)
      return res.status(404).json(errorHelper('00042', req));

    if (companyIds && companyIds.rowCount) {
      var companyId = companyIds.rows[0].CompanyID;

      const userInfo = await UserModel.getUserByUsername(companyId, [
        req.body.username,
      ]);

      if (userInfo && userInfo.rowCount) {
        const password = userInfo.rows[0].Password;
        const status = userInfo.rows[0].Status;
        const id = userInfo.rows[0].UserID;
        logInfo = {userId: id, companyId: companyId};

        if (status !== "Active") return res.status(400).json(errorHelper('00017', logInfo))

        const match = bcrypt.compareSync(req.body.password, password);
        if (!match) return res.status(400).json(errorHelper('00045', logInfo));

        const accessToken = signAccessToken(id);
        const refreshToken = signRefreshToken(id);

        if (userInfo.rows[0].Role === 'Admin') {
          const firstDept = await DeptModel.getFirstDept(companyId);
          if (firstDept.rowCount) {
            userInfo.rows[0].DeptID = firstDept.rows[0].DeptID;
          }
        }

        logger('00047', logInfo, getText('en', '00047'), 'Info', req);

        var data = {
          UserID: userInfo.rows[0].UserID,
          Username: userInfo.rows[0].Username,
          Name: userInfo.rows[0].Name,
          Avatar: userInfo.rows[0].Avatar,
          Role: userInfo.rows[0].Role,
          DeptID: userInfo.rows[0].DeptID,
          CompanyID: companyId,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        return res.send(buildRes(data, '00047'));
      }
      else return res.status(400).json(errorHelper("00017", logInfo));
    }
    else return res.status(400).json(errorHelper("00045", logInfo));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
