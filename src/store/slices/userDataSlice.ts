import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirebaseData, updateFirebaseData } from "../../firebase";
import { Post } from "./postSlice";

export interface userData {
  workout: Post | null;
  status?: string;
  isAdmin: boolean;
  nickname: string;
  avatarImg: string | null;
}

export const initialState: userData = {
  workout: null,
  status: "",
  isAdmin: false,
  nickname: "",
  avatarImg: null,
};

export const updateUserData = createAsyncThunk(
  "userWorkout/updateData",
  async (_, { getState, rejectWithValue }) => {
    const {
      user,
      userWorkout: { workout },
    } = getState() as any;
    updateFirebaseData("users", user.email, "workout", workout).catch(() => {
      rejectWithValue("Что-то пошло не так");
    });
  }
);

export const getUserData: any = createAsyncThunk(
  "userWorkout/getUserData",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { email },
    } = getState() as any;
    return getFirebaseData("users", `${email}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        rejectWithValue(error);
      });
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
      console.log(action.payload);
      state.workout = action.payload.workout;
      state.isAdmin = action.payload.isAdmin;
      state.nickname = action.payload.nickname;
      state.status = "fulfilled";
    });
    builder.addCase(getUserData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { updateUserWorkout, deleteUserWorkout } = userDataSlice.actions;

export default userDataSlice.reducer;
