import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import postSlice from "./slices/postSlice";
import userWorkoutSlice from "./slices/userWorkoutSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cards: cardsSlice,
    post: postSlice,
    userWorkout: userWorkoutSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
