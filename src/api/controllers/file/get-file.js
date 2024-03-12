import {
  errorHelper,
  logger,
  formatCriteria,
  buildRes,
} from '#root/utils/index.js';
import { FolderModel, FileModel, SavedFileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const userInfo = req.body.userInfo;
    const companyId = req.query.companyId;
    const folderId = req.query.folderId;
    const criteria = await FolderModel.getCriteriaByFolderId(
      companyId,
      folderId
    );
    const files = await FileModel.getFileMeetReq(
      companyId,
      criteria.rows[0].Criteria
    );
    for (let i = 0; i < files.rowCount; i++) {
      const isSave = await SavedFileModel.checkSaveFileByFileId(
        companyId,
        files.rows[i].FileID,
        userInfo.UserID
      )
      if (isSave.rowCount) files.rows[i].IsSave = true
      else files.rows[i].IsSave = false;
    }
    res.send(buildRes({ files: files.rows }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
