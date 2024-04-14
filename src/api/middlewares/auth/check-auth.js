import { errorHelper } from '#root/utils/index.js';
import { jwtSecretKey } from '#root/config/index.js';
import { UserModel } from '#root/models/index.js';
import pkg from 'jsonwebtoken';

export default async (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json(errorHelper('00006', req));

  if (token.includes('Bearer'))
    token = req.header('Authorization').replace('Bearer ', '');

  try {
    let userId = pkg.verify(token, jwtSecretKey);

    var date = new Date();
    var timestamp = date.getTime();

    let logInfo = {
      companyId:
        req.body.companyId ??
        req.query.companyId ??
        JSON.parse(req.body.company_id),
      userId: userId,
    };

    if (timestamp - userId.exp * 1000 > 0)
      return res.status(400).json(errorHelper('00012', logInfo));

    const exists = await UserModel.getUserById(logInfo.companyId, [userId._id]);

    if (!exists || !exists.rowCount)
      return res.status(400).json(errorHelper('00009', logInfo));

    if (exists.rows[0].Status !== 'Active')
      return res.status(400).json(errorHelper('00017', logInfo));

    req.body.userInfo = exists.rows[0];

    next();
  } catch (err) {
    return res.status(400).json(errorHelper('00012', req));
  }
};
