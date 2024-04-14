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
      .query(selectQueries.folder.getRootFolderByDeptId, [deptId])
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
  getFolderShared(companyId, deptId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getFolderShared, [deptId])
      .catch((error) => {
        console.error(error);
      });
  }
  getFolderDeleted(companyId, deptId) {
    return getComConn(companyId)
      .query(selectQueries.folder.getFolderDeleted, [deptId])
      .catch((error) => {
        console.error(error);
      });
  }
  setDeleted(companyId, folderId, changeData) {
    return getComConn(companyId)
      .query(updateQueries.folder.setDeleted, [folderId, changeData])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Folder;
