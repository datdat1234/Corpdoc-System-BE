import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class File {
  getFileById(companyId, fileId) {
    return getComConn(companyId)
      .query(selectQueries.file.getFileById, [fileId])
      .catch((error) => {
        console.error(error);
      });
  }
  getCriteria(companyId) {
    return getComConn(companyId)
      .query(selectQueries.file.getCriteria)
      .catch((error) => {
        console.error(error);
      });
  }
  addFile(companyId, data) {
    return getComConn(companyId)
      .query(insertQueries.file.addFile, data)
      .catch((error) => {
        console.error(error);
      });
  }
  getHashValue(companyId) {
    return getComConn(companyId)
      .query(selectQueries.file.getHashValue)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default File;
