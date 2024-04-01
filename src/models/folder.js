import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Folder {
  getCriteria(companyId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getCriteria)
      .catch((error) => {
        console.error(error);
      });
  }
  getCriteriaByFolderId(companyId, folderId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getCriteriaByFolderId, [folderId])
      .catch((error) => {
        console.error(error);
      });
  }
  getFolderByDeptId(companyId, deptId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getFolderByDeptId, [deptId])
      .catch((error) => {
        console.error(error);
      });
  }
  addFolder(companyId, folderInfo) {
    return getComConn(companyId)
      .query(insertQueries.folder.addFolder, folderInfo)
      .catch((error) => {
        console.error(error);
      });
  }
  getFolderByFolderId(companyId, folderId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getFolderByFolderId, [folderId])
      .catch((error) => {
        console.error(error);
      });
  }
  getRootFolderByDeptId(companyId, deptId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getRootFolderByDeptId, ['Root', deptId])
      .catch((error) => {
        console.error(error);
      });
  }
  getAuthor(companyId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getAuthor, [])
      .catch((error) => {
        console.error(error);
      });
  }
  updateFolderInfo(companyId, folderInfo) {
    return getComConn(companyId)
      .query(updateQueries.folder.updateFolderInfo, folderInfo)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Folder;
