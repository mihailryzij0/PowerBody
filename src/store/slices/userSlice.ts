import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, signIn, signUp } from "../../firebase";

export interface User {
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
    { rejectWithValue }
  ) => {
    return signIn(email, pass)
      .then((user)=>{
        localStorage.setItem("user", JSON.stringify(user));
        return user
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

export const signUpUser: any = createAsyncThunk(
  "userSlice/SignUpUser",
  async ({ email, pass }: Record<string, string>,
     { rejectWithValue }) => {
     return signUp(email, pass)
      .then((user)=>{
        localStorage.setItem("user", JSON.stringify(user));  
      return user;

     }).catch ((error: any)=>{
      return rejectWithValue(error.message);
     })
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
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const { email, token, idUser } = action.payload;
      state.email = email;
      state.token = token;
      state.idUser = idUser;
      state.isAuth = true;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = "rejected";
    });

    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const { email, token, idUser } = action.payload;
      state.email = email;
      state.token = token;
      state.idUser = idUser;
      state.isAuth = true;
    });
    builder.addCase(signUpUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = "rejected";
    });
  },
});

export const { removeUser} = userSlice.actions;

export default userSlice.reducer;
