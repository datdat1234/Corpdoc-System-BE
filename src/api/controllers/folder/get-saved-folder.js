import {
  errorHelper,
  logger,
  buildRes,
  findFolderPath,
  formatCriteria,
} from '#root/utils/index.js';
import { FolderModel, SavedFolderModel, FileModel, SavedFileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const userInfo = req.body.userInfo;
    const savedFolderInfo = await SavedFolderModel.getFolderInfo(companyId, userInfo.UserID);
    let folders = savedFolderInfo.rows;
    const savedFileInfo = await SavedFileModel.getFileInfo(companyId, userInfo.UserID);
    let files = savedFileInfo.rows;

    res.send(buildRes({ folders: folders, files: files }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
