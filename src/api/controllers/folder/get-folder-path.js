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
    const deptId = req.query.deptId;
    const folderInfo = await FolderModel.getFolderByDeptId(companyId, deptId);
    let folders = folderInfo.rows;

    // Get the parent ID of every folder
    for (let i = 0; i < folders.length; i++) {
      const parentId = await PathModel.getAncestorIdByDescendantId(
        companyId,
        folders[i].FolderID
      );
      folders[i].ParentID = parentId.rows[0]?.AncestorID;
    }

    // Find path of each folder
    folders.map((folder) => {
      const folderPath = findFolderPath(folders, folder.FolderID);
      let path = folderPath.join('/').replace('Root', '');
      if (path === '') path = '/';
      folder.Path = path;
    });

    // Format Criteria
    folders.map((folder) => {
      folder.Criteria = formatCriteria([folder], 'remove');
    });

    res.send(buildRes({ folder: folders }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
