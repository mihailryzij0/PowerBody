import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFirebaseData,
  setFirebaseData,
  setFirebaseImage,
  updateFirebaseData,
} from "../../firebase";
import { Post } from "./types";

export interface userData {
  workout: Post | null;
  status?: string;
  isAdmin: boolean;
  nickname: string;
  avatarImg: string | null;
  error: string | null;
}

export const initialState: userData = {
  workout: null,
  status: "",
  isAdmin: false,
  nickname: "",
  avatarImg: null,
  error: null,
};

export const setImageProfile = createAsyncThunk(
  "userWorkout/updateImage",
  async (image: HTMLImageElement, { rejectWithValue, getState }) => {
    const { user } = getState() as any;
    return setFirebaseImage(image, user.idUser, "imageUser")
      .then((url: string) => {
        setFirebaseData("usersAvatar", user.idUser, { avatarImg: url });
        updateFirebaseData("users", user.email, "avatarImg", url);
        return url;
      })
      .catch((error: string) => rejectWithValue(error));
  }
);

export const updateUserData = createAsyncThunk(
  "userWorkout/updateData",
  async (_, { getState }) => {
    const {
      user,
      userData: { workout },
    } = getState() as any;
    return updateFirebaseData("users", user.email, "workout", workout);
  }
);

export const getUserData: any = createAsyncThunk(
  "userWorkout/getUserData",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { email },
    } = getState() as any;
    return getFirebaseData("users", `${email}`)
      .then((response) => response)
      .catch((error) => rejectWithValue(error));
  }
);

const userDataSlice = createSlice({
  name: "userWorkout",
  initialState,
  reducers: {
    updateUserWorkout(state, action) {
      state.workout = action.payload;
    },
    deleteUserWorkout(state, action) {
      state.workout?.workouts?.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.workout = action.payload.workout;
      state.isAdmin = action.payload.isAdmin;
      state.nickname = action.payload.nickname;
      state.avatarImg = action.payload.avatarImg;
      state.status = "data-fulfilled";
    });
    builder.addCase(getUserData.pending, (state) => {
      state.status = "data-pending";
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.status = "data-rejected";
      state.error = action.payload;
    });

    builder.addCase(setImageProfile.fulfilled, (state, action) => {
      state.avatarImg = action.payload;
      state.status = "img-fulfilled";
    });
    builder.addCase(setImageProfile.pending, (state) => {
      state.status = "img-pending";
    });
    builder.addCase(setImageProfile.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = "img-rejected";
    });
  },
});

export const { updateUserWorkout, deleteUserWorkout } = userDataSlice.actions;

export default userDataSlice.reducer;
