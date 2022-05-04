import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirebaseData,
  setFirebaseData,
  updateFirebaseData,
} from "../../firebase";

interface Rating {
  voted: number;
  rating: number;
}

interface State {
  ratings: Record<string, Rating>;
  status: "" | "pending" | "fulfilled" | "rejected";
  error: string;
}

const initialState: State = {
  ratings: {},
  status: "",
  error: "",
};

export const getRating = createAsyncThunk(
  "post/getRating",
  async (postId: string, { rejectWithValue }) => {
    return getFirebaseData("rating", postId)
      .then((data) => {
        return {
          [postId]: data,
        };
      })
      .catch((error) => rejectWithValue(error));
  }
);

interface setRatingProps {
  newValue: number;
  id: string;
}

export const setRating = createAsyncThunk(
  "post/setRating",
  async ({ newValue, id }: setRatingProps, { getState, dispatch }) => {
    const {
      ratings: { ratings },
    } = getState() as any;
    const newVoted = ratings[id].voted + 1;
    const newSumRating = ratings[id].rating + newValue;

    const exposedObject = {
      sumRating: newSumRating,
      voted: newVoted,
      rating: newSumRating / newVoted,
    };
    setFirebaseData("rating", id, exposedObject);

    dispatch(
      updateRating({
        [id]: {
          sumRating: ratings[id].rating,
          voted: ratings[id].voted,
          rating: newValue,
        },
      })
    );
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    updateRating: (state, action) => {
      state.ratings = { ...state.ratings, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRating.fulfilled, (state, action) => {
      const newRatings = { ...state.ratings, ...action.payload } as Record<
        string,
        Rating
      >;
      state.ratings = newRatings;
      state.status = "fulfilled";
    });
    builder.addCase(getRating.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getRating.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

export const { updateRating } = ratingSlice.actions;

export default ratingSlice.reducer;
