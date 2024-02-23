import { errorHelper, logger, getText } from '#root/utils/index.js';

export default async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper('00088', req, err.message));
  });

  logger('00089', req.user._id, getText('en', '00089'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00089'), vi: getText('vi', '00089') },
    resultCode: '00089',
    user,
  });
};
