import { config } from 'dotenv';
config();

const {
  DB_USER_NAME,
  DB_HOST_NAME,
  DB_PASSWORD,
  DB_MAIN_DATABASE,
  DB_PORT,
  BE_PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  STORAGE_AWS_ACCESS_KEY_ID,
  STORAGE_AWS_SECRET_ACCESS_KEY,
  STORAGE_AWS_REGION,
  S3_IMAGE_BUCKET_NAME,
  S3_FILE_BUCKET_NAME,
} = process.env;

export const dbUser = DB_USER_NAME;
export const dbHost = DB_HOST_NAME;
export const dbPassword = DB_PASSWORD;
export const dbMainDatabase = DB_MAIN_DATABASE;
export const dbPort = DB_PORT || 5432;
export const bePort = BE_PORT || 3001;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const awsAccessKey = STORAGE_AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = STORAGE_AWS_SECRET_ACCESS_KEY;
export const awsRegion = STORAGE_AWS_REGION;
export const imageBucketName = S3_IMAGE_BUCKET_NAME;
export const fileBucketName = S3_FILE_BUCKET_NAME;
export const prefix = '/api';
export const specs = '/docs';
