import { CompanyModel, SystemModel } from '#root/models/index.js';
import { buildRes } from '#root/utils/index.js';

export default async (req, res) => {
  try {
    await blockUser(req.body.comId);
    res.send(buildRes({ comId: req.body.comId }, '00082'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export async function blockUser(comId) {
  try {
    // Block company
    const blockDate = new Date();
    blockDate.setDate(blockDate.getDate() + 15);
    await CompanyModel.blockCompany([comId, 'Block', blockDate]);

    // Block users
    await SystemModel.blockUser(comId);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
