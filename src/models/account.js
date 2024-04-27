import {
  db,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Account {
  getAccount(username) {
    return db
      .query(selectQueries.account.getAccount, username)
      .catch((error) => {
        console.error(error);
      });
  }
  getAccountById(acctId) {
    return db
      .query(selectQueries.account.getAccountById, acctId)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Account;
