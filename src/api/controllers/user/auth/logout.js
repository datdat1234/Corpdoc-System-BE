import { getText, logger } from '#root/utils/index.js';

export default async (req, res) => {

  logger('00050', req.user._id, getText('en', '00050'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00050'), vi: getText('vi', '00050') },
    resultCode: '00050',
  });
};
