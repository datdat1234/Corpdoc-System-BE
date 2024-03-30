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
  getFileMeetReq(companyId, criterion) {
    return getComConn(companyId)
      .query(selectQueries.file.getFileMeetReq, [criterion])
      .catch((error) => {
        console.error(error);
      });
  }
  updateFilePath(companyId, criteria, fileId) {
    return getComConn(companyId)
      .query(updateQueries.file.updateFilePath, [criteria, fileId])
      .catch((error) => {
        console.error(error);
      });
  }
  getFileSupport(companyId, deptId) {
    return getComConn(companyId)
    .query(selectQueries.file.getFileSupport, [deptId])
    .catch((error) => {
      console.error(error);
    });
  }
  getAuthor(companyId) {
    return getComConn(companyId)
    .query(selectQueries.file.getAuthor)
    .catch((error) => {
      console.error(error);
    });
  }
}

export default File;
