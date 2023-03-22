import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  dateTime: null,
  taskName: "",
  priority: null,
  category: null,
  deletedTaskId: null,
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
    setDeletedTaskId(state,action){
      state.deletedTaskId = action.payload;
    }
  },
});

export const {
  selectTask,
  setDateTime,
  setTaskName,
  setPriority,
  setCategory,
  setDeletedTaskId,
} = tasksSlice.actions;

export default tasksSlice.reducer;
