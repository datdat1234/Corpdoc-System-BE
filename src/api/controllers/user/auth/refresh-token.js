import { validateRefreshToken } from '#root/api/validators/user.validator.js';
import {
  errorHelper,
  signAccessToken,
  signRefreshToken,
  buildRes,
} from '#root/utils/index.js';
import { refreshTokenSecretKey } from '#root/config/index.js';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default async (req, res) => {
  const { error } = validateRefreshToken(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper('00059', req, error.details[0].message));

  try {
    req.body.user = verify(req.body.refreshToken, refreshTokenSecretKey);
  } catch (err) {
    return res.status(400).json(errorHelper('00063', err.message));
  }

  var date = new Date();
  var timestamp = date.getTime();
  
  if (timestamp - (req.body.user.exp* 1000) > 0)
    return res.status(400).json(errorHelper('00062', err.message));

  const accessToken = signAccessToken(req.body.user._id);
  const refreshToken = signRefreshToken(req.body.user._id);

  const data = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }

  return res.status(200).json(buildRes(data, '00065'));
};
