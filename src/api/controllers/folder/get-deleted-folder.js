import {
  errorHelper,
  logger,
  buildRes,
  findFolderPath,
  formatCriteria,
} from '#root/utils/index.js';
import { FolderModel, FileModel, PathModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const userInfo = req.body.userInfo;
    const deletedFolderInfo = await FolderModel.getFolderDeleted(companyId, userInfo.DeptID);
    let folders = deletedFolderInfo.rows;
    let ids = [];
    let parents = [];
    for(let i = 0; i < folders.length; i++) {
      ids.push(folders[i].FolderID);
      parents.push(folders[i].FolderID);
    }
    for(let i = 0; i < ids.length; i ++) {
      if (parents.includes(ids[i])) {
        const descendantIds = await PathModel.getAllDescendantIdByAncestorId(
          companyId,
          ids[i]
        );
        for (let j=0; j < descendantIds.rowCount; j++) {
          if (descendantIds.rows[j].DescendantID === ids[i]) continue;
          let index = parents.indexOf(descendantIds.rows[j].DescendantID);
          if (index > -1) parents.splice(index, 1);
        }
      }
    }

    let finalFolders = [];
    for (let i = 0; i < parents.length; i++) {
      finalFolders.push(folders[ids.indexOf(parents[i])]);
      console.log(parents[i]);
    }

    const deletedFileInfo = await FileModel.getFileDeleted(companyId, userInfo.DeptID);
    let files = deletedFileInfo.rows;

    res.send(buildRes({ folders: finalFolders, files: files }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
