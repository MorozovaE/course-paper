import { http } from "../http-common";

class GoalDataService {
  getAll() {
    return http.get("/goals");
  }
  getById(id) {
    return http.get(`/goals/${id}`);
  }
  createGoal(goalObj) {
    return http.post("/goals", goalObj);
  }
  deleteById(id) {
    return http.delete(`goals/${id}`);
  }
  editGoal(id, goalObj) {
    return http.put(`/goals/${id}`, goalObj);
  }
}

export const goalDataService = new GoalDataService();
