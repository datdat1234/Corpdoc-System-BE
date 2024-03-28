import amqplib from 'amqplib';
import {
  amqpProtocol,
  amqpUsername,
  amqpPassword,
  amqpHostname,
  amqpVhost,
  amqpMongoQueue,
} from '#root/config/index.js';
import { FileModel, NotificationModel } from '#root/models/index.js';
import { randomUUID } from 'crypto';
import { getNotiText, updateFileOCR } from '#root/utils/index.js';

const amqpUrl = `${amqpProtocol}://${amqpUsername}:${amqpPassword}@${amqpHostname}/${amqpVhost}`;

export default async () => {
  try {
    const conn = await amqplib.connect(amqpUrl);
    const channel = await conn.createChannel();

    channel.prefetch(10);
    await channel.assertQueue(amqpMongoQueue, { durable: true });
    await channel.consume(
      amqpMongoQueue,
      async (msg) => {
        // Parse message
        const data = msg.content.toString();
        const dataJson = JSON.parse(data);

        // Get data from message
        const companyId = dataJson?.data?.companyId;
        const userId = dataJson?.data?.userId;
        const fileId = dataJson?.data?.fileId;
        const criteria = dataJson?.data?.criteria;
        const body = dataJson?.data?.ocr?.body;
        const stringCriteria = criteria.join(', ');

        // Update support file path
        await FileModel.updateFilePath(companyId, criteria, fileId);

        // Get File Name
        const fileInfo = await FileModel.getFileById(companyId, fileId);
        const fileName = fileInfo.rows[0].Name;

        // Init notification info
        const notiUuid = randomUUID();
        const title = getNotiText('vi', '00001');
        const desc =
          'Văn bản ' + fileName + getNotiText('vi', '00002') + stringCriteria;
        const createdDate = new Date();
        const isSeen = false;

        // Add notification
        await NotificationModel.addNoti(companyId, [
          notiUuid,
          title,
          desc,
          createdDate,
          isSeen,
          userId,
        ]);

        // Update file criteria
        await updateFileOCR(companyId, fileId, {
          criteria,
          body,
          path: criteria,
        });
      },
      { noAck: true }
    );
  } catch (err) {
    console.log('RabbitMQ consumer error: ', err);
  }
};
