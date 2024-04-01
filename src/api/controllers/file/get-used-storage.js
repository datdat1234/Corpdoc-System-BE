import {
  buildRes,
  formatCriteria,
  postNewFolder,
} from '#root/utils/index.js';
import { FileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    // Get folder info
    const companyId = req.body.companyId;
    const deptId = req.body.deptId;

    // Get folder 
    const usedStorage = await FileModel.getUsedStorage( companyId, deptId );
    const usedStorageGB = Math.round((Number(usedStorage.rows[0].sum)/(1024*1024)) * 100) / 100;
    return res.send(buildRes(usedStorageGB));

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
