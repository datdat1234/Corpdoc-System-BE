import {
  db,
  deleteQueries,
  insertQueries,
  selectQueries,
  updateQueries,
} from '#root/utils/index.js';

class Plan {
  getPlan() {
    return db.query(selectQueries.plan.getPlan).catch((error) => {
      console.error(error);
    });
  }
  getPlanById(planId) {
    return db.query(selectQueries.plan.getPlanById, planId).catch((error) => {
      console.error(error);
    });
  }
}

export default Plan;
