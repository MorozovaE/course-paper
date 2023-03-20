import { configureStore } from "@reduxjs/toolkit";
import tasks from "./features/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks,
  },
});
