import express from 'express';
import { bePort } from '#root/config/index.js';
import loader from '#root/loaders/index.js';

const app = express();

loader(app);

app.listen(bePort, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${bePort}`);
});

export default app;
