export default {
  dept: {},
  file: {
    getFileById:
      'SELECT "FileID", "Name" FROM public."File" WHERE "FileID" = $1;',
    getHashValue:
      'SELECT "HashValue" FROM public."File" WHERE "Deleted" = false;',
  },
  folder: {
    getCriteria:
      'SELECT "Criterions" FROM public."Folder" WHERE "Deleted" = false;',
    getFolderByDeptId:
      'SELECT "FolderID", "Name", "Criterions" FROM public."Folder" WHERE "Deleted" = false AND "IsPrivate" = false AND "DeptID" = $1;',
  },
  notification: {},
  path: {
    getAncestorIdByDescendantId:
      'SELECT "AncestorID" FROM public."Path" WHERE "Depth" = 1 AND "DescendantID" = $1;',
  },
  savedFile: {},
  savedFolder: {},
  user: {
    getUserByUsername:
      'SELECT "UserID", "Username", "Password", "Name", "Avatar", "Role", "DeptID", "Status" FROM "User" WHERE "Username" = $1;',
  },
  account: {
    getCompanyId:
      'SELECT "CompanyID" FROM public."Account" WHERE "Username" = $1;',
  },
  company: {
    getCompanies: 'SELECT * FROM public."Company";',
  },
  dataDict: {},
  log: {},
};
