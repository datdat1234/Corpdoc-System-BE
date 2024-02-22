import { companyDBs } from '../db/index.js';

export default (companyID) => {
  for(let i = 0; i < companyDBs.length; i++) {
    if(companyDBs[i].id === companyID) {
      return companyDBs[i].conn;
    }
  }
  return null;
};
