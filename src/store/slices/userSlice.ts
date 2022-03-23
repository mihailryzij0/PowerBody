import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface User {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  idUser: string | null;
  status: string;
  error: string;
}

export const signInUser = createAsyncThunk(
  "userSlice/signInUser",
  async (
    { email, pass }: Record<string, string>,
    { rejectWithValue, dispatch }
  ) => {
    return signInWithEmailAndPassword(getAuth(), email, pass)
      .then(({ user }) => {
        return {
          email: user.email,
          idUser: user.uid,
          token: user.refreshToken,
        };
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);
export const SignUpUser: any = createAsyncThunk(
  "userSlice/SignUpUser",
  async ({ email, pass }: Record<string, string>, { rejectWithValue }) => {
    createUserWithEmailAndPassword(getAuth(), email, pass)
      .then(({ user }) => {
        return {
          email: user.email,
          idUser: user.uid,
          token: user.refreshToken,
        };
      })
      .catch((error) => {
        rejectWithValue(error);
      });
  }
);

const initialState: User = {
  isAuth: false,
  email: null,
  token: null,
  idUser: null,
  status: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.idUser = null;
      state.isAuth = false;
    },
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.idUser = action.payload.id;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.idUser = action.payload.idUser;
      state.isAuth = true;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { removeUser, setUser } = userSlice.actions;

export default userSlice.reducer;
