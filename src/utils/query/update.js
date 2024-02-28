export default {
  dept: {},
  file: {},
  folder: {},
  notification: {},
  path: {},
  savedFile: {},
  savedFolder: {},
  user: {
    setPassword:
      'UPDATE "User" SET "Password" = $2 WHERE "UserID" = $1;',
    setName:
      'UPDATE "User" SET "Name" = $2 WHERE "UserID" = $1;',
  },
  account: {},
  company: {},
  dataDict: {},
  log: {},
};
