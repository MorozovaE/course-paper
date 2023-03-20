import express from "express";
import { priorityController } from "../controllers/priority-controller.js";

export const priorityRouter = express.Router()

priorityRouter.route("/")
  .get(priorityController.getPriorities)
