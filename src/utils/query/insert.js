export default {
  dept: {},
  file: {},
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
