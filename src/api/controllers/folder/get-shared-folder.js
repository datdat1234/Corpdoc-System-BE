import {
  errorHelper,
  logger,
  buildRes,
  findFolderPath,
  formatCriteria,
} from '#root/utils/index.js';
import { FolderModel, FileModel, SavedFolderModel, SavedFileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const userInfo = req.body.userInfo;
    const sharedFolderInfo = await FolderModel.getFolderShared(companyId, userInfo.DeptID);
    let folders = sharedFolderInfo.rows;
    const sharedFileInfo = await FileModel.getFileShared(companyId, userInfo.DeptID);
    let files = sharedFileInfo.rows;

    for (let i = 0; i < folders.length; i++) {
      const isSave = await SavedFolderModel.checkSaveFolderByFolderId(
        companyId,
        folders[i].FolderID,
        userInfo.UserID
      )
      if (isSave.rowCount) folders[i].IsSave = true
      else folders[i].IsSave = false;
    }

    for (let i = 0; i < files.length; i++) {
      const isSave = await SavedFileModel.checkSaveFileByFileId(
        companyId,
        files[i].FileID,
        userInfo.UserID
      )
      if (isSave.rowCount) files[i].IsSave = true
      else files[i].IsSave = false;
    }

    res.send(buildRes({ folders: folders, files: files }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
