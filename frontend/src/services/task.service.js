import http from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }
}

export const taskDataService = new TaskDataService();