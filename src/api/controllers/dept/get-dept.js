import {
  buildRes,
} from '#root/utils/index.js';
import { DeptModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const depts = await DeptModel.getDept(companyId);

    // Response to request
    res.send(buildRes({ dept: depts.rows }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
