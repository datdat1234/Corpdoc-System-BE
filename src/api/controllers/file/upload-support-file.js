import { errorHelper, buildRes, s3, hashFile } from '#root/utils/index.js';
import { fileBucketName } from '#root/config/index.js';
import { FileModel } from '#root/models/index.js';
import { randomUUID } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export default async (req, res) => {
  try {
    const metadata = JSON.parse(req.body.file_metadata);
    if (metadata?.type !== 'pdf') {
      res.status(400).json(errorHelper('00094', req));
      return;
    }
    const companyId = JSON.parse(req.body.company_id);
    const file = req.file;
    const uuid = randomUUID();
    const createdDate = new Date();
    const hash = hashFile(file.buffer);
    const hashValues = await FileModel.getHashValue(companyId);
    if (hashValues.rows.some((row) => row.HashValue === hash)) {
      res
        .status(400)
        .json(errorHelper('00033', req, 'File exists in the system'));
      return;
    }
    const criteria = [];
    const s3Params = {
      Bucket: fileBucketName,
      Key: `${uuid}.pdf`,
      Body: file.buffer,
    };
    const command = new PutObjectCommand(s3Params);
    await s3.send(command);
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
      metadata?.newValue,
      metadata?.shareDeptId || [],
      metadata?.deptId,
      metadata?.userId,
      metadata?.path,
    ];
    await FileModel.addFile(companyId, fileData);
    res.send(buildRes(fileData, '00095'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
