import {
  buildRes,
  formatCriteria,
  postNewFolder,
} from '#root/utils/index.js';
import { FolderModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    // Get folder info
    const metadata = req.body;
    const companyId = metadata.companyId;
    const folderData = [
      metadata?.folderId,
      metadata?.folderName,
      metadata?.desc,
      metadata?.author,
    ];

    // Edit folder 
    const isChange = await FolderModel.updateFolderInfo( companyId, folderData );
    if (isChange.rowCount) return res.send(buildRes(true));
    return res.send(buildRes(false, '00008'));

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
