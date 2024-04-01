import {
  errorHelper,
  logger,
  formatCriteria,
  buildRes,
} from '#root/utils/index.js';
import { FileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const fileId = req.body.fileId;

    const fileInfo = await FileModel.getFileById(
      companyId,
      fileId
    );
    
    res.send(buildRes(fileInfo.rows[0]));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
