import {
  getText,
} from '#root/utils/index.js';

export default (data, code = '00001') => {
  return {
    resultMessage: {
      en: getText('en', code),
      vi: getText('vi', code),
    },
    resultCode: code,
    data: data,
  };
};
