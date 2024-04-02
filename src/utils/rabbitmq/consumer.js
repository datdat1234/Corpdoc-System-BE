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
import {
  getNotiText,
  updateFileOCR,
  formatCriteria,
} from '#root/utils/index.js';

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
        const path = dataJson?.data?.criteria;
        const stringCriteria = path.join(', ');

        // Format criteria
        const criteria = formatCriteria(path, 'add');
        const formattedCriteria = [];
        let tmpArr = [];
        for (let i = 0; i < criteria.length; i++) {
          tmpArr = criteria[i].split('/');
          for (let j = 0; j < tmpArr.length; j++) {
            formattedCriteria.push(tmpArr[j]);
          }
        }
        const uniqueArray = [...new Set(formattedCriteria)];

        // Update support file path
        const updateData = [fileId, path, uniqueArray];
        await FileModel.updateFilePathAndCrit(companyId, updateData);

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

        // Update file path and criteria
        await updateFileOCR(companyId, fileId, {
          criteria: formattedCriteria,
          path: path,
        });
      },
      { noAck: true }
    );
  } catch (err) {
    console.log('RabbitMQ consumer error: ', err);
  }
};
