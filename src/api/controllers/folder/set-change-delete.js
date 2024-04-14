import { buildRes } from '#root/utils/index.js';
import { FolderModel, PathModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const folderId = req.body.folderId;
    const isDeleted = req.body.isDeleted;

    const descendantIds = await PathModel.getAllDescendantIdByAncestorId(
      companyId,
      folderId
    );

    if (descendantIds && descendantIds.rowCount) {
      for(let i = 0; i < descendantIds.rows.length; i++) {
        await FolderModel.setDeleted(
          companyId,
          descendantIds.rows[i].DescendantID,
          !isDeleted
        );
      }
    }
    return res.send(buildRes(true));

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
