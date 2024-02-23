export default {
  dept: {},
  file: {
    getFileById:
      'SELECT "FileID", "Name" FROM public."File" WHERE "FileID" = $1;',
  },
  folder: {},
  notification: {},
  path: {},
  savedFile: {},
  savedFolder: {},
  user: {},
  account: {},
  company: {
    getCompanies: 'SELECT * FROM public."Company";',
  },
  dataDict: {},
  log: {},
};
