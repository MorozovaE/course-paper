import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,

  // TODO delete
  dateTime: null,

  priority: null,
  category: null,

  items: [],
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

    setPriority(state, action) {
      state.priority = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setItems(state,action){
      state.items = action.payload
    }
  },
});

export const {
  selectTask,
  setDateTime,
  setPriority,
  setCategory,
  setItems,
} = tasksSlice.actions;

export default tasksSlice.reducer;
