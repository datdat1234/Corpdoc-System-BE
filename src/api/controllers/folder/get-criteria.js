import { formatCriteria, buildRes } from '#root/utils/index.js';
import { FolderModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const data = await FolderModel.getCriteria(companyId);
    res.send(buildRes({ criteria: formatCriteria(data.rows, 'remove') }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
