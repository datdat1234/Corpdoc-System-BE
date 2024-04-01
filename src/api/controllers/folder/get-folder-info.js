import {
  buildRes,
  formatCriteria,
  postNewFolder,
} from '#root/utils/index.js';
import { FolderModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    // Get folder info
    const companyId = req.body.companyId;
    const folderId = req.body.folderId;

    // Get folder 
    const folderInfo = await FolderModel.getFolderByFolderId( companyId, folderId );
    return res.send(buildRes(folderInfo.rows[0]));

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
