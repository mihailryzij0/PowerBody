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
  "userData/updateImage",
  async (image: Blob, { rejectWithValue, getState }) => {
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
  "userData/updateUserData",
  async (_, { getState, rejectWithValue }) => {
    const {
      user,
      userData: { workout },
    } = getState() as any;
    return updateFirebaseData("users", user.email, "workout", workout).catch(
      (e) => {
        rejectWithValue(e);
      }
    );
  }
);

export const getUserData = createAsyncThunk(
  "userData/getUserData",
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
  name: "userData",
  initialState,
  reducers: {
    updateUserWorkout(state, action) {
      state.workout = action.payload;
    },
    deleteUserWorkout(state, action) {
      if (state.workout?.workouts?.length === 1) {
        state.workout = null;
      } else {
        state.workout?.workouts?.splice(action.payload, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.workout = action.payload.workout;
      state.isAdmin = action.payload.isAdmin;
      state.nickname = action.payload.nickname;
      state.avatarImg = action.payload.avatarImg;
      state.status = "getData-fulfilled";
    });
    builder.addCase(getUserData.pending, (state) => {
      state.status = "getData-pending";
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.status = "getData-rejected";
      state.error = action.payload as string;
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

    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.status = "setData-fulfilled";
    });
    builder.addCase(updateUserData.pending, (state) => {
      state.status = "setData-pending";
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = "setData-rejected";
    });
  },
});

export const { updateUserWorkout, deleteUserWorkout } = userDataSlice.actions;

export default userDataSlice.reducer;
