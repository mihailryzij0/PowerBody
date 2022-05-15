import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "../store/slices/cardsSlice";
import createPostSlice from "../store/slices/createPostSlice";
import getUsersAvatarSlice from "../store/slices/getUsersAvatarSlice";
import postSlice from "../store/slices/postSlice";
import userDataSlice from "../store/slices/userDataSlice";
import userReducer from "../store/slices/userSlice";
import { store } from "../store/store";
import ratingSlice from "../store/slices/ratingSlice";

export let testStore: typeof store;
export const renderWithRedux = (
  component: JSX.Element,
  preloadedState?: Record<any, any>
) => {
  testStore = configureStore({
    reducer: {
      user: userReducer,
      cards: cardsSlice,
      post: postSlice,
      userData: userDataSlice,
      createPost: createPostSlice,
      usersAvatar: getUsersAvatarSlice,
      ratings: ratingSlice,
    },
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  return {
    ...render(<Provider store={testStore}>{component}</Provider>),
  };
};
