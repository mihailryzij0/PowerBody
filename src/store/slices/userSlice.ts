import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { UserDataForm } from "../../components/formAuth/Login";
import { signIn, signUp } from "../../firebase";
import { getUserData } from "./userDataSlice";

export interface User {
  email: string | null;
  isAuth: boolean;
  idUser: string | null;
  status: "pending" | "fulfilled" | "rejected" | "";
  error: string;
}

export const onAuthChanged = createAsyncThunk(
  "userSlice/onAuthChanged",
  async (_, { dispatch }) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (data) => {
      if (data) {
        const { email, uid } = data;
        const userData = {
          email: email,
          idUser: uid,
          isAuth: true,
        };
        localStorage.setItem("isAuth", "true");
        dispatch(setUser(userData));
        dispatch(getUserData());
      } else {
        localStorage.removeItem("isAuth");
      }
    });
  }
);

export const signInUser = createAsyncThunk(
  "userSlice/signInUser",
  async ({ email, pass }: UserDataForm, { rejectWithValue }) => {
    return signIn(email, pass).catch((error) => rejectWithValue(error.message));
  }
);

export const signUpUser = createAsyncThunk(
  "userSlice/signUpUser",
  async ({ email, pass, nickname }: UserDataForm, { rejectWithValue }) => {
    return signUp(email, pass, nickname).catch((error) =>
      rejectWithValue(error.message)
    );
  }
);

export const signOutUser = createAsyncThunk(
  "userSlice/signOutUser",
  async (_, { dispatch }) => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem("isAuth");
      dispatch(removeUser());
    });
  }
);

const initialState: User = {
  email: null,
  isAuth: false,
  idUser: null,
  status: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.isAuth = action.payload.isAuth;
      state.idUser = action.payload.idUser;
    },
    removeUser(state) {
      state.email = null;
      state.isAuth = false;
      state.idUser = null;
      localStorage.removeItem("isAuth");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(signInUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(signUpUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
