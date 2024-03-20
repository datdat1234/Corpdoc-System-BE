import amqplib from 'amqplib';
import {
  amqpProtocol,
  amqpUsername,
  amqpPassword,
  amqpHostname,
  amqpVhost,
  amqpOCRQueue,
} from '#root/config/index.js';

const amqpUrl = `${amqpProtocol}://${amqpUsername}:${amqpPassword}@${amqpHostname}/${amqpVhost}`;

export default async (ids) => {
  try {
    const conn = await amqplib.connect(amqpUrl);
    const channel = await conn.createChannel();

    await channel.assertQueue(amqpOCRQueue, { durable: true });
    await channel.sendToQueue(amqpOCRQueue, Buffer.from(ids), {
      persistent: true,
    });

    setTimeout(() => {
      conn.close();
    }, 1000);
  } catch (err) {
    console.log('RabbitMQ producer error: ', err);
  }
};
