import { http } from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }
  getById(id) {
    return http.get(`/tasks/${id}`);
  }
  createTask(taskObj) {
    return http.post(`/tasks`, taskObj);
  }
  deleteById(id) {
    return http.delete(`/tasks/${id}`);
  }
  editTask(id, taskObj) {
    return http.put(`/tasks/${id}`, taskObj);
  }
  getPriorities() {
    return http.get(`/priorities`);
  }
  getCategoryList() {
    return http.get("/lists");
  }
}

export const taskDataService = new TaskDataService();
