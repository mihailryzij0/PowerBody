import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebaseData } from "../../firebase";
import { Post } from "./types";

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

export const getPostData: any = createAsyncThunk(
  "post/getPostData",
  async (postId, { rejectWithValue }) => {
    return getFirebaseData("posts", `${postId}`)
      .then((data) => data)
      .catch((error) => rejectWithValue(error));
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
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
