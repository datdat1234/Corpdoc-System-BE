import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class SavedFile {
  checkSaveFileByFileId(companyId, fileId, userId) {
    return getComConn(companyId)
      .query(selectQueries.savedFile.checkSaveFileByFileId, [fileId, userId])
      .catch((error) => {
        console.error(error);
      });
  }
  setUnSave(companyId, fileId, userId) {
    return getComConn(companyId)
      .query(deleteQueries.savedFile.setUnSave, [fileId, userId])
      .catch((error) => {
        console.error(error);
      });
  }
  setSave(companyId, fileId, userId) {
    return getComConn(companyId)
      .query(insertQueries.savedFile.setSave, [fileId, userId])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default SavedFile;