import logger from './logger.js';
import en from '../lang/en.js';
import vi from '../lang/vi.js';

export default (code, req, errorMessage) => {
  let key = code;
  if (!en[code]) key = '00008';

  let userId = '';
  let companyId = '';
  if (req && req.userId) userId = req.userId;
  if (req && req.companyId) companyId= req.companyId;

  const enMessage = en[key];
  const trMessage = vi[key];

  if (enMessage.includes('server error')) {
    logger(code, companyId, userId, errorMessage, 'Server Error', req);
  } else {
    logger(code, companyId, userId, errorMessage ?? enMessage, 'Client Error', req);
  }

  return {
    resultMessage: {
      en: enMessage,
      vi: trMessage,
    },
    resultCode: code,
  };
};
