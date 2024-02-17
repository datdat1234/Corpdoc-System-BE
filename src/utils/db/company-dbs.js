import dbLoader from './connect.js';

export default async (data) => {
  const companyIDs = data.map((company) => company.CompanyID);
  const companyDBs = [];
  for (let i = 0; i < companyIDs.length; i++) {
    companyDBs[i] = await dbLoader(companyIDs[i]);
  }
  return companyDBs;
};
