export default (data) => {
  return {
    data: {
      ...data,
    }
  };
};
// export default (code, data) => {
//   return {
//     resultMessage: {
//       en: getText('en', code),
//       vi: getText('vi', code),
//     },
//     resultCode: code,
//     data: data,
//   };
// };
