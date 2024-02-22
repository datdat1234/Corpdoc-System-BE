import { errorHelper, logger } from '../../../utils/index.js';
import { fileBucketName } from '../../../config/index.js';
import { s3 } from '../../../utils/s3-conn.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

export default async (req, res) => {
  try {
    const fileId = req.query.fileId;
    const s3Params = {
      Bucket: fileBucketName,
      Key: `${fileId}.pdf`,
    };
    const command = new GetObjectCommand(s3Params);
    const response = await s3.send(command);

    const inputStream = response.Body;
    const downloadPath = `${fileId}.pdf`;

    const writeStream = fs.createWriteStream(downloadPath);
    inputStream.pipe(writeStream);

    writeStream.on('finish', () => {
      res.download(downloadPath, `${fileId}.pdf`, (err) => {
        if (err) {
          res.status(500).json({ error: 'An error occurred' });
        }
        fs.unlinkSync(downloadPath);
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
