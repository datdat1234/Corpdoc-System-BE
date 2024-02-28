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
    const rootId = await FolderModel.getRootFolderByDeptId(companyId, deptId);
    res.send(buildRes({ folder: rootId.rows[0] }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
