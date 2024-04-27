import { errorHelper } from '#root/utils/index.js';
import { jwtSecretKey } from '#root/config/index.js';
import { AccountModel } from '#root/models/index.js';
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

    if (timestamp - userId.exp * 1000 > 0)
      return res.status(400).json(errorHelper('00012', logInfo));

    const acctRes = await AccountModel.getAccountById([userId._id]);

    if (!acctRes || !acctRes.rowCount)
      return res.status(404).json(errorHelper('00042', req));

    next();
  } catch (err) {
    return res.status(400).json(errorHelper('00012', req));
  }
};
