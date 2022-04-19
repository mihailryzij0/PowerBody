import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setFirebaseData, setFirebaseImage } from "../../firebase";
import { CreatePostProps, Post } from "./types";

interface initialState {
  status: string;
  progres: string;
  error: null;
}

export const createPost: any = createAsyncThunk(
  "post/setDataPost",
  async ({ postData, postKey }: any, { rejectWithValue, getState }) => {
    setFirebaseImage(postData.image[0], postData.image[0].name, "imagePosts")
      .then((url) => {
        postData.image = url;
        setFirebaseData("posts", `${postData.id}`, postData);
      })
      .then(() => {
        const { workouts, ...dataCards } = postData;
        const {
          cards: { postCards },
        } = getState() as any;
        const newCards = {
          ...postCards,
          [`${postKey}`]: [...postCards[`${postKey}`], dataCards],
        };
        setFirebaseData("postCards", "cards", newCards);
      })
      .catch(() => {
        rejectWithValue(postData);
      });
  }
);

const initialState = {
  status: "",
  progres: "",
  error: null,
};

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [createPost.pending]: (state) => {
      state.status = "pending";
    },
    [createPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {} = createPostSlice.actions;

export default createPostSlice.reducer;
