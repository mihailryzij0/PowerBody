import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebaseData } from "../../firebase";
import { Card } from "./types";

interface State {
  postCards: {
    vitamins: Card[];
    workouts: Card[];
  };
  status: string;
  error: string;
}

const initialState: State = {
  postCards: {
    vitamins: [],
    workouts: [],
  },
  status: "",
  error: "",
};

export const getPostCards: any = createAsyncThunk(
  "cards/getPostCards",
  async (_, { rejectWithValue }) => {
    return getFirebaseData("postCards", "cards")
      .then((respons) => respons)
      .catch((error) => rejectWithValue(error));
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostCards.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.postCards.vitamins = action.payload.vitamins;
      state.postCards.workouts = action.payload.workouts;
    });
    builder.addCase(getPostCards.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getPostCards.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const {} = cardsSlice.actions;

export default cardsSlice.reducer;
