import { db } from '#root/utils/index.js';
import { LogModel } from '#root/models/index.js';
import ipHelper from './ip-helper.js';

export default async (code, companyId, userId, errorMessage, level, req) => {
  let ip = 'no-ip';
  if (req !== '') ip = ipHelper(req);
  await LogModel.addLog(code, companyId, userId, errorMessage, level, ip);
};
