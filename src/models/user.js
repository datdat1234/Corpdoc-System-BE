import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class User {
  getUserByUsername(companyId, username) {
    return getComConn(companyId)
      .query(selectQueries.user.getUserByUsername, username)
      .catch((error) => {
        console.error(error);
      });
  }
  getUserById(companyId, id) {
    return getComConn(companyId)
      .query(selectQueries.user.getUserById, id)
      .catch((error) => {
        console.error(error);
      });
  }
  setPassword(companyId, data) {
    return getComConn(companyId)
      .query(updateQueries.user.setPassword, data)
      .catch((error) => {
        console.error(error);
      });
  }
  setName(companyId, data) {
    return getComConn(companyId)
      .query(updateQueries.user.setName, data)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default User;