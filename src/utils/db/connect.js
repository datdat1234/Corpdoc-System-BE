import pkg from 'pg';
import { dbUser, dbHost, dbPassword, dbPort } from '#root/config/index.js';

const { Pool } = pkg;

export default async (database) => {
  return new Pool({
    user: dbUser,
    host: dbHost,
    database: database,
    password: dbPassword,
    port: dbPort,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  });
};
