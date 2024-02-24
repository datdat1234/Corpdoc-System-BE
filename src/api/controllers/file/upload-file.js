import {
  errorHelper,
  logger,
  formatCriteria,
  buildRes,
  s3,
  hashFile,
  getText,
} from '#root/utils/index.js';
import { fileBucketName } from '#root/config/index.js';
import { FileModel } from '#root/models/index.js';
import { randomUUID } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export default async (req, res) => {
  try {
    const metadata = JSON.parse(req.body.file_metadata);
    const companyId = JSON.parse(req.body.company_id);
    const file = req.file;
    const uuid = randomUUID();
    const createdDate = new Date();
    const hash = hashFile(file.buffer);
    const hashValues = await FileModel.getHashValue(companyId);
    if (hashValues.rows.some((row) => row.HashValue === hash)) {
      res.status(400).json(errorHelper('00033', req));
    }
    const criteria = formatCriteria(metadata?.fileCriteria, 'add');
    const s3Params = {
      Bucket: fileBucketName,
      Key: `${uuid}.pdf`,
      Body: file.buffer,
    };
    const command = new PutObjectCommand(s3Params);
    const response = await s3.send(command);
    const fileData = [
      uuid,
      metadata?.fileName,
      criteria,
      createdDate,
      metadata?.desc,
      hash,
      metadata?.author,
      metadata?.type,
      metadata?.size,
      metadata?.deleted,
      metadata?.status,
      metadata?.isPrivate,
      null,
      [],
      metadata?.deptId,
      metadata?.userId,
      null,
    ];
    const fileInfo = await FileModel.addFile(companyId, fileData);
    res.send(
      buildRes({
        resultMessage: {
          en: getText('en', '00034'),
          vi: getText('vi', '00034'),
        },
        resultCode: '00034',
        fileData,
      })
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
