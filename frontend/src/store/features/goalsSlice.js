import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { goalDataService } from "../../services/goal.service.js";

const initialState = {
  items: [],
};

export const getAllGoals = createAsyncThunk("goals/getAll", async () => {
  const res = await goalDataService.getAll();
  return res.data.reverse();
});

export const createGoal = createAsyncThunk("goals/create", async (goalObj) => {
  const res = await goalDataService.createGoal(goalObj);
  return res.data;
});

export const deleteGoal = createAsyncThunk("goals/delete", async (id) => {
  const res = await goalDataService.getById(id);
  return res.data;
});

export const editGoal = createAsyncThunk(
  "goals/edit",
  async ({ id, goalObj }) => {
    const res = await goalDataService.editGoal(id, goalObj);
    return res.data;
  }
);

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        let deletedId = action.payload.id;
        let index = state.items.findIndex(({ id }) => id === deletedId);
        state.items.splice(index, 1);

        // if (deletedId == state.selectedTaskId) state.selectedTaskId = null;
      })
      .addCase(editGoal.fulfilled, (state, action) => {
        let index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
      });
  },
});

export const goalsSelector = (state) => state.goals.items;
export default goalsSlice.reducer;
