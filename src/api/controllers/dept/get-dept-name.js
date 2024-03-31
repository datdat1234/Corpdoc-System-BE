import {
  buildRes,
} from '#root/utils/index.js';
import { DeptModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const depts = await DeptModel.getDeptName(companyId);

    // Format dept data
    const deptFormatted = depts.rows.map(dept => dept?.Name);

    // Response to request
    res.send(buildRes({ dept: deptFormatted }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
