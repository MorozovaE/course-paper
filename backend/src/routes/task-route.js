import express from "express";
import { taskController } from "../controllers/task-controller.js";

export const taskRouter = express.Router();

taskRouter
  .route("/")
  .get(taskController.getTasks)
  .post(taskController.createTask);

taskRouter
  .route("/:taskId")
  .get(taskController.getTask)
  .delete(taskController.deleteTask)
  .put(taskController.editTask);
