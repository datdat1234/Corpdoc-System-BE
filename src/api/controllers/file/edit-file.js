import {
  formatCriteria,
  buildRes,
  updateFileInfo,
} from '#root/utils/index.js';
import { FileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    // Parse metadata
    const metadata = req.body;

    // Get file info
    const companyId = metadata.companyId;
    const criteria = formatCriteria(metadata?.fileCriteria, 'add');

    const fileData = [
      metadata?.fileId,
      metadata?.fileName,
      criteria,
      metadata?.desc,
      metadata?.author,
    ];

    // Edit file 
    console.log(fileData);
    const isChange = await FileModel.updateFileInfoPG(companyId, fileData);
    if (isChange) {

      // Edit metadata to Elasticsearch
      // const fileMetadata = {
      //   Name: metadata?.fileName,
      //   Criteria: criteria,
      //   Description: metadata?.desc,
      //   Author: metadata?.author,
      // };
      // await updateFileInfo(companyId, fileData[0], fileMetadata);

      return res.send(buildRes(true));
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
