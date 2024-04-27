export default {
  account: {
    getAccount: 'SELECT * FROM public."Account" WHERE "Username" = $1;',
    getAccountById: 'SELECT * FROM public."Account" WHERE "AccountID" = $1;',
  },
  company: {
    getCompanies: 'SELECT * FROM public."Company";',
  },
  plan: {},
};
