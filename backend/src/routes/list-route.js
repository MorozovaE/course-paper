import express from "express";
import { listController } from "../controllers/list-controller.js";

export const listRouter = express.Router()

listRouter.route("/")
  .get(listController.getLists)
