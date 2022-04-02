import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export interface Post {
  description: string;
  rating: string;
  title: string;
  id: number;
  workouts: Array<Workout>;
}

export interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

interface State {
  postCards: {
    vitamins: Array<Omit<Post, "workouts">>;
    workouts: Array<Omit<Post, "workouts">>;
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
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const respons = await getDoc(doc(db, "postCards", "cards"));
      if (!respons.exists()) {
        throw new Error("чтото пошло не так");
      }
      return respons.data();
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: {
    [getPostCards.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.postCards.vitamins = action.payload.vitamins;
      state.postCards.workouts = action.payload.workouts;
    },
    [getPostCards.pending]: (state) => {
      state.status = "pending";
    },
    [getPostCards.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {} = cardsSlice.actions;

export default cardsSlice.reducer;
