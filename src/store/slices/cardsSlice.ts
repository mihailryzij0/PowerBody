import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, getFirebaseData, setFirebaseData } from "../../firebase";

export interface Post {
  description: string;
  rating: string;
  title: string;
  id: number;
  workouts?: Array<Workout>;
}

export interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

type postCards = Omit<Post, "workouts">;

interface State {
  postCards: {
    vitamins: postCards[];
    workouts: postCards[];
  };
  status: string;
  error: string;
}
interface PropsSetPost {
  cardsData: Omit<postCards, "description">;
  postKey: string;
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
  return getFirebaseData('postCards', 'cards').then((respons)=>{
    return respons
   }).catch((error)=>{
    return rejectWithValue(error)
   })
  }
);
export const setPostCards = createAsyncThunk(
  "post/setPostCards",
  async ({ cardsData, postKey }: PropsSetPost, { dispatch, getState }) => {
    dispatch(addCards({ cardsData, postKey }));
    const {
      cards: { postCards },
    } = getState() as any;
    await setFirebaseData("postCards", "cards", postCards);
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCards(state, action) {
      action.payload.postKey === "vitamins"
        ? state.postCards.vitamins.push(action.payload.cardsData)
        : state.postCards.workouts.push(action.payload.cardsData);
    },
  },
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

export const { addCards } = cardsSlice.actions;

export default cardsSlice.reducer;

