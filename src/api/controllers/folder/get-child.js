import {
  errorHelper,
  logger,
  buildRes,
  findFolderPath,
  formatCriteria,
} from '#root/utils/index.js';
import { FolderModel, PathModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
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
      folderInfo.push(folder.rows[0]);
    }

    res.send(buildRes({ child: folderInfo }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
