import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import postSlice from "./slices/postSlice";
import userDataSlice from "./slices/userDataSlice";
import createPostSlice from "./slices/createPostSlice";
import getUsersAvatarSlice from "./slices/getUsersAvatarSlice";
import ratingSlice from "./slices/ratingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cards: cardsSlice,
    post: postSlice,
    userData: userDataSlice,
    createPost: createPostSlice,
    usersAvatar: getUsersAvatarSlice,
    ratings: ratingSlice,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
