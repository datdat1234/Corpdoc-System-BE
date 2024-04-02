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
    const sharedFolderInfo = await FolderModel.getFolderShared(companyId, userInfo.DeptID);
    let folders = sharedFolderInfo.rows;
    const sharedFileInfo = await FileModel.getFileShared(companyId, userInfo.DeptID);
    let files = sharedFileInfo.rows;

    res.send(buildRes({ folders: folders, files: files }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
