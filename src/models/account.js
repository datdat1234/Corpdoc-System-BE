import {
  db,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Account {
  getCompanyId(username) {
    return db
      .query(selectQueries.account.getCompanyId, username)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Account;
