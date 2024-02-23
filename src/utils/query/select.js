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
  user: {
    getUserByUsername: 
      'SELECT "UserID", "Username", "Password", "Name", "Avatar", "Role", "DeptID", "Status" FROM "User" WHERE "Username" =$1;',
  },
  account: {
    getCompanyId: 'SELECT "CompanyID" FROM public."Account" WHERE "Username" = $1;',
  },
  company: {
    getCompanies: 'SELECT * FROM public."Company";',
  },
  dataDict: {},
  log: {},
};
