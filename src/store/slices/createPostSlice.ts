import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setFirebaseData, setFirebaseImage } from "../../firebase";
import { WorkoutForm } from "../../pages/UserCreateWorkout";
import { RootState } from "../store";
import { Post } from "./types";

interface initialState {
  status: string;
  progress: string;
  error: null | string;
}

export interface createPostProps {
  postData: Omit<WorkoutForm, "image"> & { image: string | File[] | null };
  postKey: "vitamins" | "workouts";
}

export const createPost = createAsyncThunk(
  "post/setDataPost",
  async (
    { postData, postKey }: createPostProps,
    { rejectWithValue, getState }
  ) => {
    return setFirebaseImage(postData.image, postData.id, "imagePosts")
      .then((url) => {
        postData.image = url;
        if (postKey === "workouts") {
          postData.workouts = [].concat(
            ...(Array.from({ length: postData.weeks }).fill(
              postData.workouts
            ) as [])
          );
        }
        return setFirebaseData("posts", postData.id, postData);
      })
      .then(() => {
        return setFirebaseData("rating", postData.id, {
          rating: 5,
          voted: 0,
          sumRating: 5,
        });
      })
      .then(() => {
        const { workouts, ...dataCards } = postData;
        const {
          cards: { postCards },
        } = getState() as RootState;
        const newCards = {
          ...postCards,
          [postKey]: [...postCards[postKey], dataCards],
        };
        return setFirebaseData("postCards", "cards", newCards);
      })
      .catch((error: string) => {
        rejectWithValue(error);
      });
  }
);

const initialState: initialState = {
  status: "",
  progress: "",
  error: null,
};

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(createPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

export const {} = createPostSlice.actions;

export default createPostSlice.reducer;
