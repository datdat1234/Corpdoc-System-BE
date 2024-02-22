import { errorHelper, logger } from '../../../utils/index.js';
import { fileBucketName } from '../../../config/index.js';
import { s3 } from '../../../utils/s3-conn.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getComConn } from '../../../utils/index.js';
import selectQueries from '../../../utils/query/select.js';

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
    const comConn = getComConn(companyId);
    const fileInfo = await comConn
      .query(selectQueries.selectFile, [fileId])
      .catch((error) => {
        console.error(error);
      });
    res.send({ data: { ...fileInfo.rows[0], Url: url } });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
