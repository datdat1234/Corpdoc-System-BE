import {
  getComConn,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Path {
  getAncestorIdByDescendantId(companyId, desId) {
    return getComConn(companyId)
      .query(selectQueries.path.getAncestorIdByDescendantId, [desId])
      .catch((error) => {
        console.error(error);
      });
  }
  addPath(companyId, pathData) {
    return getComConn(companyId)
      .query(insertQueries.path.addPath, pathData)
      .catch((error) => {
        console.error(error);
      });
  }
  getDescendantIdByAncestorId(companyId, ancestorId) {
    return getComConn(companyId)
      .query(selectQueries.path.getDescendantIdByAncestorId, [ancestorId])
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Path;
