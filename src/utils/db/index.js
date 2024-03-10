import dbLoader from './connect.js';
import companyDbsLoader from './company-dbs.js';
import { selectQueries } from '#root/utils/index.js';
import { dbMainDatabase } from '#root/config/index.js';

const db = await dbLoader(dbMainDatabase);
const res = await db.query(selectQueries.company.getCompanies);
const companyDBs = await companyDbsLoader(res.rows);

export { db, companyDBs };
