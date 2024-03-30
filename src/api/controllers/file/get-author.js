import {
  buildRes,
} from '#root/utils/index.js';
import { FileModel } from '#root/models/index.js';

export default async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const authors = await FileModel.getAuthor(companyId);

    // Remove no name author
    let authorData = authors.rows;
    let returnData = [];
    for(let i = 0; i < authorData.length; i++) {
      if(authorData[i].Author !== '') {
        returnData.push(authorData[i].Author);
      }
    }

    // Remove duplicate author
    const uniqueArray = [...new Set(returnData)];

    // Response to request
    res.send(buildRes({ author: uniqueArray }));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
