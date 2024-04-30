import {
  db,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Company {
  getCompanies() {
    return db.query(selectQueries.company.getCompanies).catch((error) => {
      console.error(error);
    });
  }
  getCompanyById(comId) {
    return db
      .query(selectQueries.company.getCompanyById, comId)
      .catch((error) => {
        console.error(error);
      });
  }
  addCompany(comInfo) {
    return db
      .query(insertQueries.company.addCompany, comInfo)
      .catch((error) => {
        console.error(error);
      });
  }
  blockCompany(uptInfo) {
    return db
      .query(updateQueries.company.blockCompany, uptInfo)
      .catch((error) => {
        console.error(error);
      });
  }
  uptPlan(uptInfo) {
    return db.query(updateQueries.company.uptPlan, uptInfo).catch((error) => {
      console.error(error);
    });
  }
}

export default Company;
