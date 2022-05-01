import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "../store/slices/cardsSlice";
import createPostSlice from "../store/slices/createPostSlice";
import getUsersAvatarSlice from "../store/slices/getUsersAvatarSlice";
import postSlice from "../store/slices/postSlice";
import userDataSlice from "../store/slices/userDataSlice";
import userReducer from "../store/slices/userSlice";

export const renderWithReduxAndRouter = (
  component: JSX.Element,
  preloadedState?: Record<any, any>
) => {
  const store = configureStore({
    reducer: {
      cards: cardsSlice,
      user: userReducer,
      post: postSlice,
      userData: userDataSlice,
      createPost: createPostSlice,
      usersAvatar: getUsersAvatarSlice,
    },
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  return {
    ...render(
      <MemoryRouter>
        <Provider store={store}>{component}</Provider>
      </MemoryRouter>
    ),
  };
};
