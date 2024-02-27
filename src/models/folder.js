import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Folder {
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
}

export default Folder;
