import dbLoader from './connect.js';
import companyDbsLoader from './company-dbs.js';

const db = await dbLoader('postgres');
const res = await db.query('SELECT * FROM public."Company"');
const companyDBs = await companyDbsLoader(res.rows);

export { db, companyDBs };