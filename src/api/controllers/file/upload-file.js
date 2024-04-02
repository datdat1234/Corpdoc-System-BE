import {
  errorHelper,
  formatCriteria,
  buildRes,
  s3,
  hashFile,
  postNewFile,
} from '#root/utils/index.js';
import { fileBucketName } from '#root/config/index.js';
import { FileModel } from '#root/models/index.js';
import { randomUUID } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export default async (req, res) => {
  try {
    // Parse metadata
    const metadata = JSON.parse(req.body.file_metadata);

    // Validate file
    if (metadata?.size > 50000000) {
      res.status(400).json(errorHelper('00097'));
      return;
    }
    if (metadata?.type !== 'pdf') {
      res.status(400).json(errorHelper('00094', req));
      return;
    }

    // Get file info
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
    const criteria = formatCriteria(metadata?.fileCriteria, 'add');
    const s3Params = {
      Bucket: fileBucketName,
      Key: `${uuid}.pdf`,
      Body: file.buffer,
    };

    // Send file to S3
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

    // Add file to Postgres
    await FileModel.addFile(companyId, fileData);

    // Add metadata to Elasticsearch
    const fileMetadata = {
      FileID: uuid,
      Name: metadata?.fileName,
      Criteria: criteria,
      CreatedDate: createdDate,
      Description: metadata?.desc,
      HashValue: hash,
      Author: metadata?.author,
      Type: metadata?.type,
      Size: metadata?.size,
      Deleted: metadata?.deleted,
      Status: metadata?.status,
      IsPrivate: metadata?.isPrivate,
      NewValue: metadata?.newValue,
      SharedDeptID: metadata?.shareDeptId || [],
      DeptID: metadata?.deptId,
      UploaderID: metadata?.userId,
      Path: metadata?.path,
    };
    await postNewFile(companyId, uuid, fileMetadata);

    res.send(buildRes(fileData, '00034'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
