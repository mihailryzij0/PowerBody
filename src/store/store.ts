import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardsSlice from "./slices/cardsSlice";
import postSlice from "./slices/postSlice";
import userDataSlice from "./slices/userDataSlice";
import { User } from "./slices/userSlice";
import createPostSlice from "./slices/createPostSlice";
import getUsersAvatarSlice from "./slices/getUsersAvatarSlice";
import ratingSlice from "./slices/ratingSlice";
let userAuth = localStorage.getItem("user");
let user: User | undefined = undefined;
if (userAuth !== null) user = JSON.parse(userAuth);

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
  preloadedState: {
    user: user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
