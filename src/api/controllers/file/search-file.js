import {
  formatCriteria,
  buildRes,
} from '#root/utils/index.js';
import { FolderModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    console.log(req.query);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
