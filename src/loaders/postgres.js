import pkg from 'pg';
const { Pool } = pkg;

export default async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Corpdoc',
    password: 'deltora',
    port: 5433,
  });

  const res = await pool.query('SELECT * FROM public."Dept"');
  console.log(res.rows)
};
