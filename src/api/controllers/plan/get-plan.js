import { PlanModel } from '#root/models/index.js';
import { buildRes } from '#root/utils/index.js';

export default async (req, res) => {
  try {
    const planRes = await PlanModel.getPlan();
    res.send(buildRes({ plan: planRes.rows }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
