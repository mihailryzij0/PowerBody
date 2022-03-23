import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseAPI";
import { Post } from "./cardsSlice";

interface userWorkout {
  idUser: string | null;
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
    await setDoc(doc(db, "userWorkout", `${idUser}`), workout);
  }
);

export const getUserWorkout: any = createAsyncThunk(
  "userWorkout/getUserWorkout",
  async (idUser, { rejectWithValue, dispatch }) => {
    try {
      console.log(idUser);
      const respons = await getDoc(doc(db, "userWorkout", `${idUser}`));
      if (!respons.exists()) {
        throw new Error("чтото пошло не так");
      }
      return respons.data();
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const userWorkoutSlice = createSlice({
  name: "userWorkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserWorkout.fulfilled, (state, action) => {
      state.workout = action.payload;
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

export const {} = userWorkoutSlice.actions;

export default userWorkoutSlice.reducer;
