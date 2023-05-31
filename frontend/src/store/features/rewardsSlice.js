import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rewardDataService } from "../../services/reward.service";

const initialState = {
  items: [],
  selectedReward: {},
  selectedRewardId: null,
};

export const getAllRewards = createAsyncThunk("rewards/getAll", async () => {
  const res = await rewardDataService.getAll();
  return res.data.reverse();
});

export const createReward = createAsyncThunk(
  "rewards/create",
  async (rewardObj) => {
    const res = await rewardDataService.createReward(rewardObj);
    return res.data;
  }
);

export const editReward = createAsyncThunk(
  "rewards/edit",
  async ({ id, rewardObj }) => {
    const res = await rewardDataService.editReward(id, rewardObj);
    return res.data;
  }
);

export const getAndSelectReward = createAsyncThunk(
  "rewards/get",
  async (id) => {
    const res = await rewardDataService.getById(id);
    return res.data;
  }
);

export const deleteReward = createAsyncThunk("rewards/delete", async (id) => {
  const res = await rewardDataService.deleteById(id);
  return res.data;
});

export const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setSelectedReward: (state, action) => {
      state.selectedReward = action.payload;
    },
    setSelectedRewardId: (state, action) => {
      state.selectedRewardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRewards.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createReward.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editReward.fulfilled, (state, action) => {
        let index = state.items.findIndex(
          (reward) => reward.id === action.payload.id
        );
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
      })
      .addCase(getAndSelectReward.fulfilled, (state, action) => {
        state.selectedReward = action.payload;
      })
      .addCase(deleteReward.fulfilled, (state, action) => {
        let deletedId = action.payload.id;
        let index = state.items.findIndex(({ id }) => id === deletedId);
        state.items.splice(index, 1);

        if (deletedId == state.selectedRewardId) state.selectedRewardId = null;
      });
  },
});

export const rewardsSelector = (state) => state.rewards.items;
export const selectedRewardSelector = (state) => state.rewards.selectedReward;
export const selectedRewardIdSelector = (state) =>
  state.rewards.selectedRewardId;

export const { setSelectedReward, setSelectedRewardId } = rewardsSlice.actions;
export default rewardsSlice.reducer;
