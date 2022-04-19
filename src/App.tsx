import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginFormPage from "./pages/LoginFormPage";
import Profile from "./pages/Profile";
import PostsList from "./pages/PostsList";
import RequireAutch from "./components/hoc/RequireAutch";
import AdminWorkout from "./pages/AdminWorkout";
import PostPage from "./pages/PostPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { getPostCards } from "./store/slices/cardsSlice";
import { getUserData } from "./store/slices/userDataSlice";
import GeneratorWorkout from "./pages/GeneratorWorkout";

function App() {
  const dispach = useAppDispatch();
  const { user } = useAppSelector((state) => state);
  useEffect(() => {
    if (user.isAuth) {
      dispach(getPostCards());
      dispach(getUserData(user.idUser));
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAutch>
            <Profile />
          </RequireAutch>
        }
      />
      <Route path="/addWorkout" element={<AdminWorkout />} />
      <Route path="/posts" element={<PostsList />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/generator" element={<GeneratorWorkout />} />
      <Route path="/login" element={<LoginFormPage />} />
    </Routes>
  );
}

export default App;
