export default {
  dept: {},
  file: {
    addFile:
      'INSERT INTO public."File"("FileID", "Name", "Criterions", "CreatedDate", "Description", "HashValue", "Author", "Type", "Size", "Deleted", "Status", "IsPrivate", "NewValue", "SharedDeptID", "DeptID", "UploaderID", "Path") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);',
  },
  folder: {},
  notification: {},
  path: {},
  savedFile: {},
  savedFolder: {},
  user: {},
  account: {},
  company: {},
  dataDict: {},
  log: {
    addLog:
      'INSERT INTO public."Log" ("LogID", "Code", "CompanyID", "UserID", "ErrorMessage", "Level", "IpAddress") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)',
  },
};
