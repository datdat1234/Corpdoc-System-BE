import expressLoader from './express.js';
import { amqpConsumer } from '#root/utils/index.js';

export default async (app) => {
  expressLoader(app);
  amqpConsumer();
};
