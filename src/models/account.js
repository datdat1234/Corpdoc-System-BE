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
  addAccount(acctInfo) {
    return db
      .query(insertQueries.account.addAccount, acctInfo)
      .catch((error) => {
        console.error(error);
      });
  }
  getAccountUsername(acctId) {
    return db
      .query(selectQueries.account.getAccountUsername, acctId)
      .catch((error) => {
        console.error(error);
      });
  }
  getAccountUsnByComId(comId) {
    return db
      .query(selectQueries.account.getAccountUsnByComId, comId)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Account;
