import { configureStore } from "@reduxjs/toolkit";
import tasks from "./features/tasksSlice";
import rewards from "./features/rewardsSlice";
import goals from "./features/goalsSlice";

export const store = configureStore({
  reducer: {
    tasks,
    rewards,
    goals
  },
});
