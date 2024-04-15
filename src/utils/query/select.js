export default {
  dept: {
    getFirstDept: 'SELECT "DeptID" FROM public."Dept" LIMIT 1',
    getDeptName: 'SELECT "Name" FROM public."Dept"',
    getDeptIDByName: 'SELECT "DeptID" FROM public."Dept" WHERE "Name" = $1',
    getDept: 'SELECT * FROM public."Dept"',
    getDeptById: 'SELECT * FROM public."Dept" WHERE "DeptID" = $1',
  },
  file: {
    getFileById:
      'SELECT "FileID", "Name", "Description", "Criteria", "Author" FROM public."File" WHERE "FileID" = $1 AND "Deleted" = false;',
    getHashValue:
      'SELECT "HashValue" FROM public."File" WHERE "Deleted" = false;',
    getFileMeetReq:
      'SELECT * FROM public."File" WHERE (SELECT $1 ::character varying[] <@ "Criteria") AND "Deleted"=false;',
    getFileSupport:
      'SELECT * FROM public."File" WHERE "DeptID" = $1 AND "Path" IS NOT NULL AND "Deleted" = false;',
    getAuthor: 'SELECT "Author" FROM public."File";',
    getUsedStorage:
      'SELECT Sum("Size") FROM public."File" WHERE "DeptID" = $1;',
    getCriteria:
      'SELECT "Criteria" FROM public."File" WHERE "Deleted" = false;',
    getFileShared:
      `SELECT * FROM public."File" WHERE "SharedDeptID" @> ARRAY[$1]::uuid[] AND "Deleted" = false`,
    getFileDeleted:
      `SELECT * FROM public."File" WHERE "Deleted" = true AND "DeptID" = $1;`,
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
      'SELECT * FROM public."Folder" WHERE "Deleted" = false AND "IsPrivate" = false AND "Name" IS NULL AND "DeptID" = $1;',
    getAuthor: 'SELECT "Author" FROM public."Folder"',
    getFolderShared:
      `SELECT * FROM public."Folder" WHERE "SharedDeptID" @> ARRAY[$1]::uuid[] AND "Name" IS NOT NULL`,
    getFolderDeleted:
      `SELECT * FROM public."Folder" WHERE "Deleted" = true AND "DeptID" = $1;`,
  },
  notification: {
    getNoti:
      'SELECT * FROM public."Notification" WHERE "UserID" = $1 ORDER BY "Time" DESC;',
  },
  path: {
    getAncestorIdByDescendantId:
      'SELECT "AncestorID" FROM public."Path" WHERE "Depth" = 1 AND "DescendantID" = $1;',
    getDescendantIdByAncestorId:
      'SELECT "DescendantID" FROM public."Path" WHERE "Depth" = 1 AND "AncestorID" = $1;',
    getAllDescendantIdByAncestorId:
      'SELECT "DescendantID" FROM public."Path" WHERE "AncestorID" = $1;',
    getAncestorIdByDepth:
      'SELECT "AncestorID" FROM public."Path" WHERE "Depth" = $2 AND "DescendantID" = $1;',
  },
  savedFile: {
    checkSaveFileByFileId: `SELECT * FROM public."Saved_File" WHERE "FileID" = $1 AND "UserID" = $2;`,
    getFileInfo: `SELECT public."Saved_File"."FileID", public."File"."Name", public."File"."Size", public."File"."CreatedDate" 
      FROM public."Saved_File" 
      LEFT JOIN public."File" ON public."Saved_File"."FileID" = public."File"."FileID"
      WHERE public."Saved_File"."UserID" = $1 AND public."File"."Deleted" = false;`,
    getFileByUserID: `SELECT * FROM public."Saved_File" WHERE "UserID" = $1;`,
  },
  savedFolder: {
    checkSaveFolderByFolderId: `SELECT * FROM public."Saved_Folder" WHERE "FolderID" = $1 AND "UserID" = $2;`,
    getFolderInfo: `SELECT public."Saved_Folder"."FolderID", public."Folder"."Name", public."Folder"."Criteria", public."Folder"."CreatedDate"
      FROM public."Saved_Folder" 
      LEFT JOIN public."Folder" ON public."Saved_Folder"."FolderID" = public."Folder"."FolderID"
      WHERE public."Saved_Folder"."UserID" = $1 AND public."Folder"."Deleted" = false AND public."Folder"."Name" IS NOT NULL;`,
    getFolderByUserID: `SELECT * FROM public."Saved_Folder" WHERE "UserID" = $1;`,
  },
  user: {
    getUserByUsername:
      'SELECT "UserID", "Username", "Password", "Name", "Avatar", "Role", "DeptID", "Status" FROM "User" WHERE "Username" = $1;',
    getUserById: 'SELECT * FROM "User" WHERE "UserID" = $1;',
    getUsersByDeptId: 'SELECT "UserID", "Name", "Username", "Role", "Status" FROM public."User" WHERE "DeptID" = $1 ORDER BY "Name";',
  },
  account: {
    getCompanyId:
      'SELECT "CompanyID" FROM public."Account" WHERE "Username" = $1;',
  },
  company: {
    getCompanies: 'SELECT * FROM public."Company";',
    getDefaultPassById: 'SELECT "DefaultPassword" FROM public."Company" WHERE "CompanyID" = $1;',
  },
  dataDict: {},
  log: {},
};
