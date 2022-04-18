import { CasinoOutlined } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirebaseData } from "../../firebase";

interface userAvatar {
  userId: string;
  avatarImage: string;
}

interface State {
  usersAvatar: Array<userAvatar> | [];
  status: "" | "pending" | "fulfilled" | "rejected";
  error: string;
}

const initialState: State = {
  usersAvatar: [],
  status: "",
  error: "",
};

export const getUserAvatar: any = createAsyncThunk(
  "post/getUserAvatar",
  async (userId: string, { rejectWithValue }) => {
    if (userId !== null) {
      return getFirebaseData("usersAvatar", userId)
        .then((respons) => {
          return {
            userId: userId,
            avatarImage: respons.avatarImg,
          };
        })
        .catch();
    }
  }
);

const getUsersAvatarSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAvatar.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const newUserAvatsr = [...state.usersAvatar, action.payload];
      state.usersAvatar = newUserAvatsr;
    });
    builder.addCase(getUserAvatar.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUserAvatar.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const {} = getUsersAvatarSlice.actions;

export default getUsersAvatarSlice.reducer;
