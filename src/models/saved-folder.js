import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class SavedFolder {
  checkSaveFolderByFolderId(companyId, folderId, userId) {
    return getComConn(companyId)
      .query(selectQueries.savedFolder.checkSaveFolderByFolderId, [folderId, userId])
      .catch((error) => {
        console.error(error);
      });
  }
  setUnSave(companyId, folderId, userId) {
    return getComConn(companyId)
      .query(deleteQueries.savedFolder.setUnSave, [folderId, userId])
      .catch((error) => {
        console.error(error);
      });
  }
  setSave(companyId, folderId, userId) {
    return getComConn(companyId)
      .query(insertQueries.savedFolder.setSave, [folderId, userId])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default SavedFolder;