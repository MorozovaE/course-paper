import express from "express";

import { rewardController } from "../controllers/reward-controller.js";
import { upload } from "../middleware/upload-middleware.js";

export const rewardRouter = express.Router();

rewardRouter
  .route("/")
  .get(rewardController.getRewards)
  .post(upload.single("file"), rewardController.createReward);

rewardRouter
  .route("/:rewardId")
  .get(rewardController.getReward)
  .delete(rewardController.deleteReward)
  .put(rewardController.editReward);
