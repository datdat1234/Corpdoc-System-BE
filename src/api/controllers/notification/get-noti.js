import { buildRes } from '#root/utils/index.js';
import { NotificationModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const userId = req.query.userId;
    const notis = await NotificationModel.getNoti(companyId, userId);
    const isNew = notis.rows.find((noti) => noti.IsSeen === false);
    return res.send(buildRes({ noti: notis.rows, isNew: isNew !== undefined }));
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
