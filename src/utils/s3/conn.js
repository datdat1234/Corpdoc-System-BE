import {
  awsAccessKey,
  awsSecretAccessKey,
  awsRegion,
} from '#root/config/index.js';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
  region: awsRegion,
});

export { s3 };
