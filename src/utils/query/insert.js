export default {
  dept: {},
  file: {
    addFile:
      'INSERT INTO public."File"("FileID", "Name", "Criteria", "CreatedDate", "Description", "HashValue", "Author", "Type", "Size", "Deleted", "Status", "IsPrivate", "NewValue", "SharedDeptID", "DeptID", "UploaderID", "Path") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);',
  },
  folder: {
    addFolder:
      'INSERT INTO public."Folder"("FolderID", "Name", "Criteria", "CreatedDate", "Description", "Author", "Deleted", "IsPrivate", "SharedDeptID", "DeptID", "CreatorID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
  },
  notification: {},
  path: {
    addPath:
      'INSERT INTO public."Path"("AncestorID", "DescendantID", "Depth") VALUES ($1, $2, $3);',
  },
  savedFile: {
    setSave:
      'INSERT INTO public."Saved_File"("FileID", "UserID") VALUES ($1, $2);',
  },
  savedFolder: {
    setSave:
      'INSERT INTO public."Saved_Folder"("FolderID", "UserID") VALUES ($1, $2);',
  },
  user: {},
  account: {},
  company: {},
  dataDict: {},
  log: {
    addLog:
      'INSERT INTO public."Log" ("LogID", "Code", "CompanyID", "UserID", "ErrorMessage", "Level", "IpAddress") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)',
  },
};
