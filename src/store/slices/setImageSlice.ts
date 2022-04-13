import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setFirebaseData, setFirebaseImage } from "../../firebase";
import { addCards, setPostCards } from "./cardsSlice";
import { setPostData, setPostProps } from "./postSlice";

interface initialState {
  status: string;
  progres: string;
  error: null;
}

export const setDataPost: any = createAsyncThunk(
  "post/setDataPost",
  async ({ data, postKey }: any, { dispatch, rejectWithValue, getState }) => {
    setFirebaseImage(data.image[0])
      .then((url) => {
        data.image = url;
      })
      .then(() => {
        console.log(data);
        setFirebaseData("posts", `${data.id}`, data);
      })
      .then(() => {
        const { workouts, ...dataCards } = data;
        const {
          cards: { postCards },
        } = getState() as any;
        const newCards = {
          ...postCards,
          [`${postKey}`]: [...postCards[`${postKey}`], dataCards],
        };
        console.log(newCards);
        // dispatch(addCards({ dataCards, postKey }));
        // const {
        //   cards: { postCards },
        // } = getState() as any;
        setFirebaseData("postCards", "cards", newCards);
      })
      .catch(() => {
        rejectWithValue("Загрузка не удалась, попробуйте еще раз");
      });
  }
);

const initialState = {
  status: "",
  progres: "",
  error: null,
};

const setImageSlice = createSlice({
  name: "setImage",
  initialState,
  reducers: {},
  extraReducers: {
    [setDataPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [setDataPost.pending]: (state) => {
      state.status = "pending";
    },
    [setDataPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {} = setImageSlice.actions;

export default setImageSlice.reducer;
