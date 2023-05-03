import { configureStore } from "@reduxjs/toolkit";
import tasks from "./features/tasksSlice";
import rewards from "./features/rewardsSlice"

export const store = configureStore({
  reducer: {
    tasks,
    rewards,
  },
});
