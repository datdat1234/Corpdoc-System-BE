import { s3, buildRes } from '#root/utils/index.js';
import { fileBucketName } from '#root/config/index.js';
import { FileModel } from '#root/models/index.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';

export default async (req, res) => {
  try {
    const fileId = req.query.fileId;
    const companyId = req.query.companyId;
    const s3Params = {
      Bucket: fileBucketName,
      Key: `${fileId}.pdf`,
    };
    const command = new GetObjectCommand(s3Params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const fileInfo = await FileModel.getFileById(companyId, fileId);
    res.send(buildRes({ ...fileInfo.rows[0], Url: url }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
