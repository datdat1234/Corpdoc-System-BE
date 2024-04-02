import { formatCriteria, buildRes } from '#root/utils/index.js';
import { FileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const data = await FileModel.getCriteria(companyId);

    // Remove duplicate criterion
    const uniqueCriteria = data.rows.filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (o) => JSON.stringify(o.Criteria) === JSON.stringify(obj.Criteria)
        )
    );

    // Response to request
    res.send(buildRes({ criteria: formatCriteria(uniqueCriteria, 'remove') }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
