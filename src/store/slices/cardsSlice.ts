import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db} from "../../firebaseAPI";


export interface Post {
  description: string;
  rating: string;
  title: string;
  id: string;
  workouts: Array<Workout>;
}

interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

interface State {
  postCard: {
    vitamins: Array<Omit<Post, "workouts">>;
    workouts: Array<Omit<Post, "workouts">>;
  };
  status: string;
  error: string
}

const initialState: State = {
  postCard: {
    vitamins: [],
    workouts: [],
  },
  status:'',
  error:''
};

export const getPostCards: any = createAsyncThunk(
  "cards/getPostCards",
  async (_, { rejectWithValue, dispatch }) => {
    try{
      const respons = await getDoc( doc(db, "postCards", "cards"));
      if(!respons.exists()){
        throw new Error('чтото пошло не так')
      }
      return respons.data();
    }catch(error: any){
    return rejectWithValue(error.message)
    }
  } 
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // setWorkout(state, action) {
    //   state.workouts.push(action.payload)
    // },
    setWorkoutPostsCard(state, action) {
      state.postCard.vitamins = action.payload.vitamins;
      state.postCard.workouts = action.payload.workouts;
    },
  },
  extraReducers: {
    [getPostCards.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.postCard.vitamins = action.payload.vitamins;
      state.postCard.workouts = action.payload.workouts;

    },
    [getPostCards.pending]: (state) =>  {
      state.status = 'pending'
    },
    [getPostCards.rejected]: (state, action) => {
      state.status = 'pending'
      state.error = action.payload
    },
  },
});

export const {  setWorkoutPostsCard } =
cardsSlice.actions;

export default cardsSlice.reducer;
