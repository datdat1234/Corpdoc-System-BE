import {
  db,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Log {
  addLog(code, companyId, userId, errorMessage, level, ip) {
    return db
      .query(insertQueries.log.addLog, [
        code,
        companyId,
        userId,
        errorMessage,
        level,
        ip,
      ])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Log;
