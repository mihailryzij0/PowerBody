import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Post } from "./cardsSlice";

export interface userData {
  workout: Post | null;
  status?: string;
  isAdmin: boolean;
}

export const initialState: userData = {
  workout: null,
  status: "",
  isAdmin: false,
};

export const setUserWorkout = createAsyncThunk(
  "userWorkout/setUserWorkout",
  async (workout: Post, { getState, dispatch }) => {
    console.log(workout);
    const {
      user: { email },
    } = getState() as any;
    dispatch(updateWorkout(workout));
    const ref = doc(db, "users", `${email}`);
    await updateDoc(ref, {
      workout: workout,
    });
  }
);

export const updateUserWorkout = createAsyncThunk(
  "userWorkout/updateWorkout",
  async (_, { getState }) => {
    const {
      user,
      userWorkout: { workout },
    } = getState() as any;

    const ref = doc(db, "users", `${user.email}`);
    await updateDoc(ref, {
      workout: workout,
    });
  }
);

export const getUserWorkout: any = createAsyncThunk(
  "userWorkout/getUserWorkout",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { email },
    } = getState() as any;
    try {
      const respons = await getDoc(doc(db, "users", `${email}`));
      if (!respons.exists()) {
        throw new Error("чтото пошло не так");
      }
      const workout = respons.data();
      return workout;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userWorkoutSlice = createSlice({
  name: "userWorkout",
  initialState,
  reducers: {
    updateWorkout(state, action) {
      state.workout = action.payload;
    },
    deleteWorkout(state, action) {
      state.workout?.workouts?.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserWorkout.fulfilled, (state, action) => {
      state.workout = action.payload.workout;
      state.isAdmin = action.payload.isAdmin;
      state.status = "fulfilled";
    });
    builder.addCase(getUserWorkout.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getUserWorkout.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { deleteWorkout, updateWorkout } = userWorkoutSlice.actions;

export default userWorkoutSlice.reducer;
