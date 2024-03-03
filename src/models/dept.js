import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Dept {
  getFirstDept(companyId) {
    return getComConn(companyId)
      .query(selectQueries.dept.getFirstDept, [])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Dept;