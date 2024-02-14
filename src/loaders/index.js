// import mongooseLoader from './mongoose.js';
import postgresLoader from './postgres.js';
import expressLoader from './express.js';

export default async (app) => {
  // await mongooseLoader();
  await postgresLoader();
  expressLoader(app);
};
