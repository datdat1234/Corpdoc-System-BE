import { getText } from '#root/utils/index.js';

export default async (req, res) => {
  return res.status(200).json({
    resultMessage: { en: getText('en', '00050'), vi: getText('vi', '00050') },
    resultCode: '00050',
  });
};
