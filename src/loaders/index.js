import expressLoader from './express.js';
import { db, companyDBs } from '../utils/db/index.js';

export default async (app) => {
  db.query('SELECT * FROM public."Data_Dict"')
    .then((result) => {
      console.log(result.rows);
    })
    .catch((error) => {
      console.error(error);
    });
  expressLoader(app);
};
