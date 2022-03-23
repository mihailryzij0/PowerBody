import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db} from "../../firebaseAPI";
import { Post } from "./cardsSlice";

interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

interface State {
  postData: Post;
  status: string;
  error: string
}

const initialState: State = {
  postData: {
    description: "",
    rating: "",
    title: "",
    id: "",
    workouts: [],
  },
  status:'',
  error:''
};

export const getPostData: any = createAsyncThunk(
  "post/getPostData",
  async (postId, { rejectWithValue, dispatch }) => {
    try{
      const respons = await getDoc( doc(db, "posts", `${postId}`));
      if(!respons.exists()){
        throw new Error('чтото пошло не так')
      }
      return respons.data();
    }catch(error: any){
    return rejectWithValue(error.message)
    }
  } 
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getPostData.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.postData = action.payload
    },
    [getPostData.pending]: (state) =>  {
      state.status = 'pending'
    },
    [getPostData.rejected]: (state, action) => {
      state.status = 'pending'
      state.error = action.payload
    },
  },
});

export const {} =
postSlice.actions;

export default postSlice.reducer;
