import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, setFirebaseData, setFirebaseImage } from "../../firebase";
import { Post } from "./cardsSlice";

interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

interface State {
  postData: Post | null;
  status: string;
  error: string;
}

const initialState: State = {
  postData: null,
  status: "",
  error: "",
};

export type setPostProps = Required<Post> | Required<Omit<Post, "workouts">>;

export const getPostData: any = createAsyncThunk(
  "post/getPostData",
  async (postId, { rejectWithValue }) => {
    try {
      const respons = await getDoc(doc(db, "posts", `${postId}`));
      if (!respons.exists()) {
        throw new Error("чтото пошло не так");
      }
      return respons.data();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const setPostData = createAsyncThunk(
  "post/setPostData",
  async (postData: setPostProps, { rejectWithValue }) => {
    setFirebaseData("posts", `${postData.id}`, postData).catch((error) => {
      return rejectWithValue(error);
    });
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getPostData.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.postData = action.payload;
    },
    [getPostData.pending]: (state) => {
      state.status = "pending";
    },
    [getPostData.rejected]: (state, action) => {
      state.status = "pending";
      state.error = action.payload;
    },
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
