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
}

export default File;
