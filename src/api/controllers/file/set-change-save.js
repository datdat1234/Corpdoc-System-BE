import {
  errorHelper,
  logger,
  buildRes,
  findFolderPath,
  formatCriteria,
} from '#root/utils/index.js';
import { FolderModel, SavedFileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const userInfo = req.body.userInfo;
    const companyId = req.body.companyId;
    const fileId = req.body.fileId;
    const status = req.body.status;
    
    if (status) {
      const isChange = await SavedFileModel.setUnSave(
        companyId, 
        fileId, 
        userInfo.UserID
      );
      if (isChange.rowCount) return res.send(buildRes(true));
      return res.send(buildRes(false, '00008'));
    }
    else {
      const isChange = await SavedFileModel.setSave(
        companyId, 
        fileId, 
        userInfo.UserID
      );
      if (isChange.rowCount) return res.send(buildRes(true));
      return res.send(buildRes(false, '00008'));
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
