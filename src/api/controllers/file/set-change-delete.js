import { buildRes } from '#root/utils/index.js';
import { FileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const fileId = req.body.fileId;
    const isDeleted = req.body.isDeleted;

    const isChange = await FileModel.setDeleted(
      companyId,
      fileId,
      !isDeleted
    );
    if (isChange.rowCount) return res.send(buildRes(true));
    return res.send(buildRes(false, '00008'));

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
