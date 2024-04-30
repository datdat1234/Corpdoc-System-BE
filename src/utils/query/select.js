export default {
  account: {
    getAccount: 'SELECT * FROM public."Account" WHERE "Username" = $1;',
    getAccountById: 'SELECT * FROM public."Account" WHERE "AccountID" = $1;',
    getAccountUsername: 'SELECT "Username" FROM public."Account" WHERE "CompanyID" = $1 LIMIT 1;',
    getAccountUsnByComId: `SELECT "Username" FROM public."Account" WHERE "CompanyID" = $1 AND "Username" LIKE '%Admin%' LIMIT 1;`,
  },
  company: {
    getCompanies: 'SELECT * FROM public."Company";',
    getCompanyById: 'SELECT * FROM public."Company" WHERE "CompanyID" = $1;',
  },
  plan: {
    getPlan: 'SELECT * FROM public."Plan";',
    getPlanById: 'SELECT * FROM public."Plan" WHERE "PlanID" = $1;',
  },
  system: {
    getAdminId: `SELECT "UserID" FROM public."User" WHERE "Role" = 'Admin' LIMIT 1;`,
    getFolderId: `SELECT "FolderID" FROM public."Folder" LIMIT 1;`,
  },
};
