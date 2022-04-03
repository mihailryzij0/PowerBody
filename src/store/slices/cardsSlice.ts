import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

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
export const setPostCards = createAsyncThunk(
  "post/setPostCards",
  async ({ cardsData, postKey }: PropsSetPost, { dispatch, getState }) => {
    dispatch(addCards({ cardsData, postKey }));
    const {
      cards: { postCards },
    } = getState() as any;
    await setDoc(doc(db, "postCards", "cards"), postCards);
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
function getState(): any {
  throw new Error("Function not implemented.");
}
