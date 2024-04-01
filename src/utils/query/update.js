export default {
  dept: {},
  file: {
    updateFilePath: 'UPDATE "File" SET "Path" = $1 WHERE "FileID" = $2;',
    updateFileInfoPG:
      `UPDATE public."File" 
      SET "Name" = $2, "Criteria" = $3, "Description" = $4, "Author" = $5 
      WHERE "FileID" = $1;`,
  },
  folder: {
    updateFolderInfo:
      `UPDATE public."Folder" SET "Name" = $2, "Description" = $3, "Author" = $4 WHERE "FolderID"=$1;`,
  },
  notification: {},
  path: {},
  savedFile: {},
  savedFolder: {},
  user: {
    setPassword: 'UPDATE "User" SET "Password" = $2 WHERE "UserID" = $1;',
    setName: 'UPDATE "User" SET "Name" = $2 WHERE "UserID" = $1;',
  },
  account: {},
  company: {},
  dataDict: {},
  log: {},
};
