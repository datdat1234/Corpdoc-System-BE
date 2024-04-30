import { companyDBs } from '#root/utils/index.js';
import dbLoader from '#root/utils/db/connect.js';

export default async (companyID) => {
  for (let i = 0; i < companyDBs.length; i++) {
    if (companyDBs[i].id === companyID) {
      return companyDBs[i].conn;
    }
  }

  let comLen = companyDBs.length;
  const conn = await dbLoader(companyID);
  companyDBs[comLen] = {};
  companyDBs[comLen].id = companyID;
  companyDBs[comLen].conn = conn;

  return conn;
};
