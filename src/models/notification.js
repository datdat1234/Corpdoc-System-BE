import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Notification {
  getNoti(companyId, userId) {
    return getComConn(companyId)
      .query(selectQueries.notification.getNoti, [userId])
      .catch((error) => {
        console.error(error);
      });
  }
  addNoti(companyId, data) {
    return getComConn(companyId)
      .query(insertQueries.notification.addNotification, data)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Notification;
