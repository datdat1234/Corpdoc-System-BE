import pkg from 'pg';

const { Pool } = pkg;

export default async (database) => {
  return new Pool({
    user: 'postgres',
    host: 'localhost',
    database: database,
    password: 'deltora',
    port: 5433,
  });
};
