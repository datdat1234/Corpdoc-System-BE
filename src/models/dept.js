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
  getDeptName(companyId) {
    return getComConn(companyId)
      .query(selectQueries.dept.getDeptName, [])
      .catch((error) => {
        console.error(error);
      });
  }
  getDept(companyId) {
    return getComConn(companyId)
      .query(selectQueries.dept.getDept, [])
      .catch((error) => {
        console.error(error);
      });
  }
  getDeptIDByName(companyId, deptName) {
    return getComConn(companyId)
      .query(selectQueries.dept.getDeptIDByName, [deptName])
      .catch((error) => {
        console.error(error);
      });
  }
  getDeptById(companyId, deptId) {
    return getComConn(companyId)
      .query(selectQueries.dept.getDeptById, [deptId])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Dept;
