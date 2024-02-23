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
}

export default User;