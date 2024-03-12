export default {
  dept: {},
  file: {},
  folder: {},
  notification: {},
  path: {},
  savedFile: {
    setUnSave:
      `DELETE FROM public."Saved_File" WHERE "FileID" = $1 AND "UserID" = $2;`,
  },
  savedFolder: {
    setUnSave:
      `DELETE FROM public."Saved_Folder" WHERE "FolderID" = $1 AND "UserID" = $2;`,
  },
  user: {},
  account: {},
  company: {},
  dataDict: {},
  log: {},
};
