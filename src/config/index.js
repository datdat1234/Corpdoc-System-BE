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
  SALT_HASH,
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
export const saltHash = SALT_HASH;
export const prefix = '/api/system';
