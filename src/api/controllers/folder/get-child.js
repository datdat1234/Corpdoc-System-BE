import {
  errorHelper,
  logger,
  buildRes,
  findFolderPath,
  formatCriteria,
} from '#root/utils/index.js';
import { FolderModel, PathModel, SavedFolderModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const userInfo = req.body.userInfo;
    const companyId = req.query.companyId;
    const folderId = req.query.folderId;
    const childId = await PathModel.getDescendantIdByAncestorId(
      companyId,
      folderId
    );
    let folders = childId.rows.map((folder) => folder.DescendantID);
    let folderInfo = [];
    for (let i = 0; i < folders.length; i++) {
      const folder = await FolderModel.getFolderByFolderId(
        companyId,
        folders[i]
      );
      const isSave = await SavedFolderModel.checkSaveFolderByFolderId(
        companyId,
        folders[i],
        userInfo.UserID
      )
      if (isSave.rowCount) folder.rows[0].IsSave = true
      else folder.rows[0].IsSave = false;
      folderInfo.push(folder.rows[0]);
    }

    return res.send(buildRes({ child: folderInfo }));
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
