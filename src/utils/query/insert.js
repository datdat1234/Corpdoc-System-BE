export default {
  insertLog:
    'INSERT INTO public."Log" ("LogID", "Code", "CompanyID", "UserID", "ErrorMessage", "Level", "IpAddress") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)',
};
