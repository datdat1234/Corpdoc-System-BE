import {
  errorHelper,
  logger,
  getText,
  buildRes,
  formatCriteria,
} from '#root/utils/index.js';
import { FolderModel, PathModel } from '#root/models/index.js';
import { randomUUID } from 'crypto';

export default async (req, res) => {
  try {
    const metadata = req.body;
    const companyId = metadata.companyId;
    const uuid = randomUUID();
    const createdDate = new Date();
    const criteria = formatCriteria(metadata?.folderCriteria, 'add');
    const folderData = [
      uuid,
      metadata?.folderName,
      criteria,
      createdDate,
      metadata?.desc,
      metadata?.author,
      metadata?.deleted,
      metadata?.isPrivate,
      metadata?.shareDeptId || [],
      metadata?.deptId,
      metadata?.userId,
    ];
    const folderInfo = await FolderModel.addFolder(companyId, folderData);
    const parentFolders = [metadata.folderParentInfo];
    while (true) {
      const parentId = await PathModel.getAncestorIdByDescendantId(
        companyId,
        parentFolders[parentFolders.length - 1]
      );

      if (parentId.rows[0]?.AncestorID) {
        parentFolders.push(parentId.rows[0]?.AncestorID);
      } else break;
    }

    const parentId = await PathModel.addPath(companyId, [uuid, uuid, 0]);

    for (let i = 0; i < parentFolders.length; i++) {
      const parentId = await PathModel.addPath(companyId, [
        parentFolders[i],
        uuid,
        i + 1,
      ]);
    }

    res.send(buildRes(folderInfo, '00093'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
