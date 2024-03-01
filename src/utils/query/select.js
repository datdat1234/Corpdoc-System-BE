export default {
  dept: {},
  file: {
    getFileById:
      'SELECT "FileID", "Name" FROM public."File" WHERE "FileID" = $1;',
    getHashValue:
      'SELECT "HashValue" FROM public."File" WHERE "Deleted" = false;',
    getFileMeetReq: 'SELECT * FROM public."File" WHERE (SELECT $1 ::character varying[] <@ "Criteria");',
  },
  folder: {
    getCriteria:
      'SELECT "Criteria" FROM public."Folder" WHERE "Deleted" = false;',
    getCriteriaByFolderId:
      'SELECT "Criteria" FROM public."Folder" WHERE "Deleted" = false AND "FolderID" = $1;',
    getFolderByDeptId:
      'SELECT "FolderID", "Name", "Criteria" FROM public."Folder" WHERE "Deleted" = false AND "IsPrivate" = false AND "DeptID" = $1;',
    getFolderByFolderId:
      'SELECT * FROM public."Folder" WHERE "Deleted" = false AND "IsPrivate" = false AND "FolderID" = $1;',
    getRootFolderByDeptId:
      'SELECT * FROM public."Folder" WHERE "Deleted" = false AND "IsPrivate" = false AND "Name" = $1 AND "DeptID" = $2;',
  },
  notification: {},
  path: {
    getAncestorIdByDescendantId:
      'SELECT "AncestorID" FROM public."Path" WHERE "Depth" = 1 AND "DescendantID" = $1;',
    getDescendantIdByAncestorId:
      'SELECT "DescendantID" FROM public."Path" WHERE "Depth" = 1 AND "AncestorID" = $1;',
  },
  savedFile: {},
  savedFolder: {},
  user: {
    getUserByUsername:
      'SELECT "UserID", "Username", "Password", "Name", "Avatar", "Role", "DeptID", "Status" FROM "User" WHERE "Username" = $1;',
    getUserById:
      'SELECT * FROM "User" WHERE "UserID" = $1;',
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
