import { errorHelper } from '#root/utils/index.js';

export async function checkAdmin(req, res, next) {
  const role = req.body.userInfo.Role;

  if (role !== 'Admin') return res.status(403).json(errorHelper('00017', req));

  next();
}
export async function checkManager(req, res, next) {
  const role = req.body.userInfo.Role;

  if (role === 'Staff') return res.status(403).json(errorHelper('00017', req));

  next();
}
