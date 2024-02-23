import { companyDBs } from '#root/utils/index.js';

export default (companyID) => {
  for (let i = 0; i < companyDBs.length; i++) {
    if (companyDBs[i].id === companyID) {
      return companyDBs[i].conn;
    }
  }
  return null;
};
