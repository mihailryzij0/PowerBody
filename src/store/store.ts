import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import postSlice from "./slices/postSlice";
import userWorkoutSlice from "./slices/userWorkoutSlice";
import {User} from "./slices/userSlice"
let userAutch =  localStorage.getItem('userData') 
let user:User | undefined = undefined;
if(userAutch !== null) user = JSON.parse(userAutch);

export const store = configureStore({
  reducer: {
    user: userReducer,
    cards: cardsSlice,
    post: postSlice,
    userWorkout: userWorkoutSlice,
  },
  preloadedState: {
    user: user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
