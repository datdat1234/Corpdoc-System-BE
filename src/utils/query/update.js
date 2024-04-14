export default {
  dept: {},
  file: {
    updateFilePathAndCrit: 'UPDATE "File" SET "Path" = $2, "Criteria" = $3 WHERE "FileID" = $1;',
    updateFileInfoPG:
      `UPDATE public."File" 
      SET "Name" = $2, "Criteria" = $3, "Description" = $4, "Author" = $5 
      WHERE "FileID" = $1;`,
    setDeleted:
      `UPDATE public."File" SET "Deleted" = $2, "UpdatedDate"=NOW() WHERE "FileID"=$1;`,
  },
  folder: {
    updateFolderInfo:
      `UPDATE public."Folder" SET "Name" = $2, "Description" = $3, "Author" = $4 WHERE "FolderID"=$1;`,
    setDeleted:
      `UPDATE public."Folder" SET "Deleted" = $2, "UpdatedDate"=NOW() WHERE "FolderID"=$1;`,
  },
  notification: {},
  path: {},
  savedFile: {},
  savedFolder: {},
  user: {
    setPassword: 'UPDATE "User" SET "Password" = $2 WHERE "UserID" = $1;',
    setName: 'UPDATE "User" SET "Name" = $2 WHERE "UserID" = $1;',
    changeStatus: 'UPDATE "User" SET "Status" = $2 WHERE "UserID" = $1;',
  },
  account: {},
  company: {},
  dataDict: {},
  log: {},
};
