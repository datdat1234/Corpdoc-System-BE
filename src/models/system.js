import {
  db,
  getComConn,
  createQueries,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class System {
  createDb(dbName) {
    return db
      .query(createQueries.system.createDb + dbName + '";')
      .catch((error) => {
        console.error(error);
      });
  }
  async createSchema(companyId) {
    const conn = await getComConn(companyId);
    return conn.query(createQueries.system.createSchema).catch((error) => {
      console.error(error);
    });
  }
  async createCstr(companyId) {
    const conn = await getComConn(companyId);
    return conn.query(createQueries.system.createCstr).catch((error) => {
      console.error(error);
    });
  }
  async addDept(companyId, deptInfo) {
    const conn = await getComConn(companyId);
    return conn.query(insertQueries.system.addDept, deptInfo).catch((error) => {
      console.error(error);
    });
  }
  async addUser(companyId, userInfo) {
    const conn = await getComConn(companyId);
    return conn.query(insertQueries.system.addUser, userInfo).catch((error) => {
      console.error(error);
    });
  }
  async addFolder(companyId, folderInfo) {
    const conn = await getComConn(companyId);
    return conn
      .query(insertQueries.system.addFolder, folderInfo)
      .catch((error) => {
        console.error(error);
      });
  }
  async addPath(companyId, pathInfo) {
    const conn = await getComConn(companyId);
    return conn.query(insertQueries.system.addPath, pathInfo).catch((error) => {
      console.error(error);
    });
  }
  async blockUser(companyId) {
    const conn = await getComConn(companyId);
    return conn.query(updateQueries.system.blockUser).catch((error) => {
      console.error(error);
    });
  }
  async getAdminId(companyId) {
    const conn = await getComConn(companyId);
    return conn.query(selectQueries.system.getAdminId).catch((error) => {
      console.error(error);
    });
  }
  async getFolderId(companyId) {
    const conn = await getComConn(companyId);
    return conn.query(selectQueries.system.getFolderId).catch((error) => {
      console.error(error);
    });
  }
  async uptRootFdr(companyId, uptInfo) {
    const conn = await getComConn(companyId);
    return conn
      .query(updateQueries.system.uptRootFdr, uptInfo)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default System;
