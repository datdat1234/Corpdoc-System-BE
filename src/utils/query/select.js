export default {
  dept: {
    getFirstDept: 'SELECT "DeptID" FROM public."Dept" LIMIT 1',
    getDeptName: 'SELECT "Name" FROM public."Dept"',
  },
  file: {
    getFileById:
      'SELECT "FileID", "Name" FROM public."File" WHERE "FileID" = $1;',
    getHashValue:
      'SELECT "HashValue" FROM public."File" WHERE "Deleted" = false;',
    getFileMeetReq:
      'SELECT * FROM public."File" WHERE (SELECT $1 ::character varying[] <@ "Criteria");',
    getFileSupport:
      'SELECT * FROM public."File" WHERE "DeptID" = $1 AND "Path" IS NOT NULL',
    getAuthor:
      'SELECT "Author" FROM public."File"',
  },
  folder: {
    getCriteria:
      'SELECT "Criteria" FROM public."Folder" WHERE "Deleted" = false;',
    getCriteriaByFolderId:
      'SELECT "Criteria" FROM public."Folder" WHERE "Deleted" = false AND "FolderID" = $1;',
    getFolderByDeptId:
      'SELECT "FolderID", "Name", "Criteria" FROM public."Folder" WHERE "Deleted" = false AND "IsPrivate" = false AND "DeptID" = $1;',
    getFolderByFolderId: `SELECT * FROM "Folder"
      WHERE "Deleted" = false 
      AND "IsPrivate" = false 
      AND "FolderID" = $1;`,
    getRootFolderByDeptId:
      'SELECT * FROM public."Folder" WHERE "Deleted" = false AND "IsPrivate" = false AND "Name" = $1 AND "DeptID" = $2;',
    getAuthor:
      'SELECT "Author" FROM public."Folder"',
  },
  notification: {
    getNoti: 'SELECT * FROM public."Notification" WHERE "UserID" = $1 ORDER BY "Time" DESC;',
  },
  path: {
    getAncestorIdByDescendantId:
      'SELECT "AncestorID" FROM public."Path" WHERE "Depth" = 1 AND "DescendantID" = $1;',
    getDescendantIdByAncestorId:
      'SELECT "DescendantID" FROM public."Path" WHERE "Depth" = 1 AND "AncestorID" = $1;',
    getAncestorIdByDepth:
      'SELECT "AncestorID" FROM public."Path" WHERE "Depth" = $2 AND "DescendantID" = $1;',
  },
  savedFile: {
    checkSaveFileByFileId: 
      `SELECT * FROM public."Saved_File" WHERE "FileID" = $1 AND "UserID" = $2;`,
    getFileInfo: 
      `SELECT public."Saved_File"."FileID", public."File"."Name", public."File"."Size" 
      FROM public."Saved_File" 
      LEFT JOIN public."File" ON public."Saved_File"."FileID" = public."File"."FileID"
      WHERE public."Saved_File"."UserID" = $1;`,
  },
  savedFolder: {
    checkSaveFolderByFolderId: 
      `SELECT * FROM public."Saved_Folder" WHERE "FolderID" = $1 AND "UserID" = $2;`,
    getFolderInfo: 
      `SELECT public."Saved_Folder"."FolderID", public."Folder"."Name", public."Folder"."Criteria" 
      FROM public."Saved_Folder" 
      LEFT JOIN public."Folder" ON public."Saved_Folder"."FolderID" = public."Folder"."FolderID"
      WHERE public."Saved_Folder"."UserID" = $1;`,
  },
  user: {
    getUserByUsername:
      'SELECT "UserID", "Username", "Password", "Name", "Avatar", "Role", "DeptID", "Status" FROM "User" WHERE "Username" = $1;',
    getUserById: 'SELECT * FROM "User" WHERE "UserID" = $1;',
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
