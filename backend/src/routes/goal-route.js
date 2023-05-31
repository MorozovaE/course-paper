import express from "express";

import { goalController } from "../controllers/goal-controller.js";

export const goalRouter = express.Router();

goalRouter
  .route("/")
  .get(goalController.getGoals)
  .post(goalController.createGoal);

goalRouter
  .route("/:goalId")
  .get(goalController.getGoal)
  .delete(goalController.deleteGoal)
  .put(goalController.editGoal);
