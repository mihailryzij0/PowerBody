import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import postSlice from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cards: cardsSlice,
    post: postSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
