import { CompanyModel, PlanModel, AccountModel } from '#root/models/index.js';
import { buildRes } from '#root/utils/index.js';

export default async (req, res) => {
  try {
    // Get company by id
    const companyId = req.query.id;
    const comRes = await CompanyModel.getCompanyById([companyId]);
    const admAcctRes = await AccountModel.getAccountUsnByComId([companyId]);
    const admAcct = admAcctRes.rows[0].Username;

    // Get plan by id
    const planId = comRes.rows[0].PlanID;
    const planRes = await PlanModel.getPlanById([planId]);
    const comData = [{ ...comRes.rows[0], ...planRes.rows[0], AdminUsn: admAcct }];

    res.send(buildRes({ company: comData }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
