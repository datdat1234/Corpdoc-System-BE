import { errorHelper, logger, getText, buildRes } from '#root/utils/index.js';

export default async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper('00088', req, err.message));
  });

  logger('00089', req.user._id, getText('en', '00089'), 'Info', req);
  return res.status(200).json(buildRes(user, '00089'));
};
