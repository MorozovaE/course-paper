import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskDataService } from "../../services/task.service.js";

const initialState = {
  task: {},
  selectedTaskId: null,
  completed: null,
  dateTime: null,
  priority: null,
  category: null,
  items: [],
};

export const getAllTasks = createAsyncThunk("tasks/getAll", async () => {
  const res = await taskDataService.getAll();
  return res.data.reverse();
});
export const createTask = createAsyncThunk("tasks/create", async (taskObj) => {
  const res = await taskDataService.createTask(taskObj);
  return res.data;
});

export const getTask = createAsyncThunk("tasks/get", async (id) => {
  const res = await taskDataService.getById(id);
  return res.data;
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  const res = await taskDataService.deleteById(id);
  return res.data;
});

export const editTask = createAsyncThunk(
  "tasks/edit",
  async ({ id, taskObj }) => {
    const res = await taskDataService.editTask(id, taskObj);
    return res.data;
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.task = action.payload;
    },
    selectTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    setDateTime: (state, action) => {
      state.dateTime = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setCompleted(state, action) {
      state.completed = action.payload;
    },
  },
  extraReducers: (builder) => {
    // qs
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        let deletedId = action.payload.id;
        let index = state.items.findIndex(({ id }) => id === deletedId);
        state.items.splice(index, 1);

        if (deletedId == state.selectedTaskId) state.selectedTaskId = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        let index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload;
      });
  },
});

export const taskSelector = (state) => state.tasks.task;
export const selectedTaskIdSelector = (state) => state.tasks.selectedTaskId;
export const tasksSelector = (state) => state.tasks.items;
export const categorySelector = (state) => state.tasks.category;
export const dateTimeSelector = (state) => state.tasks.dateTime;
export const prioritySelector = (state) => state.tasks.priority;
export const completedSelector = (state) => state.tasks.completed;

export const {
  selectTask,
  setCompleted,
  setSelectedTask,
  setDateTime,
  setPriority,
  setCategory,
} = tasksSlice.actions;

export default tasksSlice.reducer;
