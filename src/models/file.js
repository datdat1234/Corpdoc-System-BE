import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';
import { filter } from 'compression';

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
  updateFilePathAndCrit(companyId, data) {
    return getComConn(companyId)
      .query(updateQueries.file.updateFilePathAndCrit, data)
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
  updateFileInfoPG(companyId, fileInfo) {
    return getComConn(companyId)
      .query(updateQueries.file.updateFileInfoPG, fileInfo)
      .catch((error) => {
        console.error(error);
      });
  }
  getUsedStorage(companyId, deptId) {
    return getComConn(companyId)
      .query(selectQueries.file.getUsedStorage, [deptId])
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
}

export default File;
