import { db } from './db/index.js';
import insertQueries from './query/insert.js';
import ipHelper from './helpers/ip-helper.js';

export default async (code, companyId, userId, errorMessage, level, req) => {
  let ip = 'no-ip';
  if (req !== '') ip = ipHelper(req);
  
  await db
    .query(insertQueries.insertLog, [
      code,
      companyId,
      userId,
      errorMessage,
      level,
      ip,
    ])
    .catch((error) => {
      console.error(error);
    });
};
