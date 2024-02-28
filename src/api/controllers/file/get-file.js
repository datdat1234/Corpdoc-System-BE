import {
  errorHelper,
  logger,
  formatCriteria,
  buildRes,
} from '#root/utils/index.js';
import { FolderModel, FileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const folderId = req.query.folderId;
    const criteria = await FolderModel.getCriteriaByFolderId(
      companyId,
      folderId
    );
    const files = await FileModel.getFileMeetReq(
      companyId,
      criteria.rows[0].Criterions
    );
    res.send(buildRes({ files: files.rows }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
