import {
  db,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Company {
  getDefaultPassById(companyId) {
    return db
      .query(selectQueries.company.getDefaultPassById, [companyId])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Company;