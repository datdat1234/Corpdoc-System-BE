import en from '../lang/en.js';
import vi from '../lang/vi.js';

export default (code, req, errorMessage) => {
  let key = code;
  if (!en[code]) key = '00008';

  let userId = null;
  let companyId = null;
  if (req && req.userId) userId = req.userId;
  if (req && req.companyId) companyId= req.companyId;

  const enMessage = en[key];
  const trMessage = vi[key];

  return {
    resultMessage: {
      en: enMessage,
      vi: trMessage,
    },
    resultCode: code,
  };
};
