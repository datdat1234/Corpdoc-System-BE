import {
  errorHelper,
  buildRes,
} from '#root/utils/index.js';
import { FolderModel, PathModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const deptId = req.body.deptId;
    const rootId = await FolderModel.getRootFolderByDeptId(companyId, deptId);
    if (rootId && rootId.rowCount) {
      const domainIds = await PathModel.getDescendantIdByAncestorId(
        companyId,
        rootId.rows[0].FolderID
      );

      if (domainIds && domainIds.rowCount) {
        let domainData = [];
        for(let i = 0; i < domainIds.rows.length; i++) {
          let data = await FolderModel.getFolderByFolderId(
            companyId, 
            domainIds.rows[i].DescendantID
          );
          if (data && data.rowCount) {
            domainData.push(data.rows[0]);
          }
        }
    
        return res.send(buildRes({domainIds: domainData}));
      }
    }
    return res.status(400).json(errorHelper("00008"));

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: req.body });
  }
};
