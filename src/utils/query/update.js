export default {
  account: {},
  company: {
    blockCompany: `UPDATE public."Company" 
  SET "Status" = $2, "OutdatedDate" = $3 
  WHERE "CompanyID" = $1;`,
    uptPlan: `UPDATE public."Company" 
  SET "PlanID" = $2
  WHERE "CompanyID" = $1;`,
  },
  plan: {},
  system: {
    blockUser: `UPDATE public."User" SET "Status" = 'Block' WHERE "Role" != 'Admin';`,
    uptRootFdr: `UPDATE public."Dept" SET "RootFolderID" = $2 WHERE "DeptID" = $1;`,
  },
};
