import { validateLogin } from '#root/api/validators/account.validator.js';
import { AccountModel } from '#root/models/index.js';
import {
  errorHelper,
  signAccessToken,
  signRefreshToken,
  buildRes,
} from '#root/utils/index.js';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    var logInfo = { userId: '' };
    if (error) {
      let code = '00038';
      if (error.details[0].message.includes('username')) code = '00039';
      else if (error.details[0].message.includes('password')) code = '00040';

      return res
        .status(400)
        .json(errorHelper(code, logInfo, error.details[0].message));
    }

    const acctRes = await AccountModel.getAccount([req.body.username]);

    if (!acctRes || !acctRes.rowCount)
      return res.status(404).json(errorHelper('00042', req));

    if (acctRes && acctRes.rowCount) {
      var accountId = acctRes.rows[0].AccountID;
      var password = acctRes.rows[0].Password;
      var companyId = acctRes.rows[0].CompanyID;

      if (accountId && password && !companyId) {
        logInfo = { accountId: accountId };

        const match = bcrypt.compareSync(req.body.password, password);
        if (!match) return res.status(400).json(errorHelper('00045', logInfo));

        const accessToken = signAccessToken(accountId);
        const refreshToken = signRefreshToken(accountId);

        var data = {
          UserID: accountId,
          Username: acctRes.rows[0].Username,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        return res.send(buildRes(data, '00047'));
      } else return res.status(400).json(errorHelper('00017', logInfo));
    } else return res.status(400).json(errorHelper('00045', logInfo));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
