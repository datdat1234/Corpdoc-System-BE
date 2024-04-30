import { CompanyModel, PlanModel } from '#root/models/index.js';
import { buildRes } from '#root/utils/index.js';

export default async (req, res) => {
  try {
    const comRes = await CompanyModel.getCompanies();
    const comLst = comRes.rows;
    for (let i = 0; i < comLst.length; i++) {
      const planRes = await PlanModel.getPlanById([comLst[i].PlanID]);
      comLst[i] = { ...comLst[i], ...planRes.rows[0] };
    }
    res.send(buildRes({ company: comLst }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
