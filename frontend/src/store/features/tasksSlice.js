import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  dateTime: null,
  taskName: "",
  priority: null,
  category: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.id = action.payload;
    },
    setDateTime: (state, action) => {
      state.dateTime = action.payload;
    },
    setTaskName: (state, action) => {
      state.taskName = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const {
  selectTask,
  setDateTime,
  setTaskName,
  setPriority,
  setCategory,
} = tasksSlice.actions;

export default tasksSlice.reducer;
