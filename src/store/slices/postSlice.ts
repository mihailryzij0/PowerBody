import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebaseData, updateFirebaseData } from "../../firebase";
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

export const updateComments = createAsyncThunk(
  "post/updateComments",
  async (postId: string, { rejectWithValue, getState }) => {
    const {
      post: { postData },
    } = getState() as any;
    return updateFirebaseData("posts", postId, "comments", postData.comments);
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.postData?.comments.push(action.payload);
    },
  },
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

export const { setComments } = postSlice.actions;

export default postSlice.reducer;
