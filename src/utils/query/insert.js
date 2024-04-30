export default {
  account: {
    addAccount: `INSERT INTO public."Account"(
      "AccountID", "Username", "Password", "CompanyID")
      VALUES ($1, $2, $3, $4);`,
  },
  company: {
    addCompany: `INSERT INTO public."Company"(
      "CompanyID", "CompanyName", "DefaultPassword", "Status", "OutdatedDate", "PlanID")
      VALUES ($1, $2, $3, $4, $5, $6);`,
  },
  plan: {},
  system: {
    addDept: `INSERT INTO public."Dept"(
      "DeptID", "Name", "RootFolderID", "Storage")
      VALUES ($1, $2, $3, $4);`,
    addUser: `INSERT INTO public."User"(
      "UserID", "Username", "Password", "Name", "Role", "Status", "DeptID")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    addFolder: `INSERT INTO public."Folder"(
      "FolderID", "Name", "Criteria", "CreatedDate", "Description", "Author", "Deleted", "IsPrivate", "SharedDeptID", "DeptID", "CreatorID", "UpdatedDate")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
    addPath: `INSERT INTO public."Path"(
      "AncestorID", "DescendantID", "Depth")
      VALUES ($1, $2, $3);`,
  },
};
