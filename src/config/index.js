import { config } from 'dotenv';
config();

const {
  DB_USER_NAME,
  DB_HOST_NAME,
  DB_PASSWORD,
  DB_MAIN_DATABASE,
  DB_PORT,
  IS_ALLOW_SSL,
  BE_PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  STORAGE_AWS_ACCESS_KEY_ID,
  STORAGE_AWS_SECRET_ACCESS_KEY,
  STORAGE_AWS_REGION,
  S3_IMAGE_BUCKET_NAME,
  S3_FILE_BUCKET_NAME,
  AMQP_PROTOCOL,
  AMQP_USERNAME,
  AMQP_PASSWORD,
  AMQP_HOSTNAME,
  AMQP_VHOST,
  AMQP_OCR_QUEUE,
  AMQP_MONGO_QUEUE,
  ELASTIC_SEARCH_URL,
} = process.env;

export const dbUser = DB_USER_NAME;
export const dbHost = DB_HOST_NAME;
export const dbPassword = DB_PASSWORD;
export const dbMainDatabase = DB_MAIN_DATABASE;
export const dbPort = DB_PORT || 5432;
export const isAllowSSL = IS_ALLOW_SSL === 'true';
export const bePort = BE_PORT || 3001;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const awsAccessKey = STORAGE_AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = STORAGE_AWS_SECRET_ACCESS_KEY;
export const awsRegion = STORAGE_AWS_REGION;
export const imageBucketName = S3_IMAGE_BUCKET_NAME;
export const fileBucketName = S3_FILE_BUCKET_NAME;
export const amqpProtocol = AMQP_PROTOCOL;
export const amqpUsername = AMQP_USERNAME;
export const amqpPassword = AMQP_PASSWORD;
export const amqpHostname = AMQP_HOSTNAME;
export const amqpVhost = AMQP_VHOST;
export const amqpOCRQueue = AMQP_OCR_QUEUE;
export const amqpMongoQueue = AMQP_MONGO_QUEUE;
export const esUrl = ELASTIC_SEARCH_URL;
export const prefix = '/api';
export const specs = '/docs';
