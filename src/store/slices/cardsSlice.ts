import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebaseData } from "../../firebase";
import { Card } from "./types";

interface State {
  postCards: {
    vitamins: Card[];
    workouts: Card[];
  };
  filteredCards: {
    vitamins: Card[] | null;
    workouts: Card[] | null;
    filteredParams: {
      author: string;
      typeWorkout: string;
    };
  };
  status: string;
  error: string;
}

const initialState: State = {
  postCards: {
    vitamins: [],
    workouts: [],
  },
  filteredCards: {
    vitamins: null,
    workouts: null,
    filteredParams: {
      author: "Весь список",
      typeWorkout: "Весь список",
    },
  },
  status: "",
  error: "",
};

export const getPostCards: any = createAsyncThunk(
  "cards/getPostCards",
  async (_, { rejectWithValue }) => {
    return getFirebaseData("postCards", "cards")
      .then((response) => {
        return response;
      })
      .catch((error) => rejectWithValue(error));
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    filterCards: (state, action) => {
      const filteredTypeWorkout = action.payload.typeWorkout;
      const filteredAuthor = action.payload.author;
      if (
        filteredTypeWorkout == "Весь список" &&
        filteredAuthor == "Весь список"
      ) {
        state.filteredCards.vitamins = state.postCards.vitamins;
        state.filteredCards.workouts = state.postCards.workouts;
      } else {
        for (let field in state.postCards) {
          const key = field as "vitamins" | "workouts";
          state.filteredCards[key] = state.postCards[key].filter((card) => {
            if (filteredAuthor == "Весь список") {
              return card.typeWorkout === action.payload.typeWorkout;
            } else if (filteredTypeWorkout == "Весь список") {
              return card.author === action.payload.author;
            } else {
              return (
                card.typeWorkout === action.payload.typeWorkout &&
                card.author === action.payload.author
              );
            }
          });
        }
      }
      state.filteredCards.filteredParams.author = filteredAuthor;
      state.filteredCards.filteredParams.typeWorkout = filteredTypeWorkout;
    },
  },
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

export const { filterCards } = cardsSlice.actions;

export default cardsSlice.reducer;
