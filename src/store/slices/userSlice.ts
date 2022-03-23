import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface User{
  isAuth: boolean
  email: string | null,
  token: string | null,
  id: string | null,
  status:string,
  error: string
}

export const signInUser = createAsyncThunk(
  "userSlice/signInUser",
  async ({email, pass}:Record<string,string>, { rejectWithValue, dispatch }) => {
    signInWithEmailAndPassword(getAuth(), email, pass)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser(
          {
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }
        ))
      })
      .catch((error)=>{
        rejectWithValue(error)
      });
  }
);
export const SignUpUser: any = createAsyncThunk(
  "userSlice/signInUser",
  async ({email, pass}:Record<string,string>, { rejectWithValue, dispatch }) => {
    createUserWithEmailAndPassword(getAuth(), email, pass)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser(
          {
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }
        ))
      })
      .catch((error)=>{
        rejectWithValue(error)
      });
  }
);



const initialState: User = {
  isAuth: false,
  email: null,
  token: null,
  id: null,
  status:'',
  error:''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isAuth = false;
    },
    setUser(state,action){
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isAuth = true
    }
  },
  extraReducers: (builder) => {  
    builder.addCase(signInUser.fulfilled, (state, action) => {
    state.status = 'fulfilled'
  })
  builder.addCase(signInUser.pending, (state, action) => {
    state.status = 'pending'
  })
  builder.addCase(signInUser.rejected, (state, action) => {
    state.status = 'rejected'
  })


   },
});

export const {removeUser, setUser } = userSlice.actions;

export default userSlice.reducer;
