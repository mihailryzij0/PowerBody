import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getFirebaseData,
  setFirebaseData,
  setFirebaseImage,
} from "../../firebase";

export interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

export interface Post {
  author: string | null;
  image: string | null;
  description: string;
  rating: string;
  title: string;
  id: number;
  workouts?: Array<Workout>;
}

interface State {
  postData: Post | null;
  status: "" | "pending" | "fulfilled" | "rejected";
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
    return getFirebaseData("posts", `${postId}`)
      .then((data) => data)
      .catch((error) => rejectWithValue(error));
  }
);
export const setPostData = createAsyncThunk(
  "post/setPostData",
  async (postData: setPostProps, { rejectWithValue }) => {
    setFirebaseData("posts", `${postData.id}`, postData).catch((error) =>
      rejectWithValue(error)
    );
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostData.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.postData = action.payload;
    });
    builder.addCase(getPostData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPostData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(setPostData.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(setPostData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(setPostData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
