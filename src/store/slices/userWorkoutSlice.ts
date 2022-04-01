import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Post } from "./cardsSlice";

export interface userWorkout {
  idUser?: string | null;
  workout: Post;
  status?: string;
}

const initialState: userWorkout = {
  workout: {
    description: "",
    rating: "",
    title: "",
    id: "",
    workouts: [],
  },
  status: "",
  idUser: "",
};

export const setUserWorkout = createAsyncThunk(
  "userWorkout/setUserWorkout",
  async ({ workout, idUser }: userWorkout, { rejectWithValue, dispatch }) => {
    dispatch(updateWorkout(workout))
    await setDoc(doc(db, "userWorkout", `${idUser}`), workout);
  }
);

export const updateUserWorkout = createAsyncThunk(
  "userWorkout/updateWorkout",
  async (_, { getState}) => {
    const {
      user,
      userWorkout: { workout },
    } = getState() as any;

    await setDoc(doc(db, "userWorkout", `${user.idUser}`), workout);
  }
);

export const getUserWorkout: any = createAsyncThunk(
  "userWorkout/getUserWorkout",
  async (idUser, { rejectWithValue}) => {
    try {
      const respons = await getDoc(doc(db, "userWorkout", `${idUser}`));
      if (!respons.exists()) {
        throw new Error("чтото пошло не так");
      }
      const data = respons.data();
      return { data, idUser };
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
      state.workout.workouts.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserWorkout.fulfilled, (state, action) => {
      state.workout = action.payload.data;
      state.idUser = action.payload.idUser;
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
