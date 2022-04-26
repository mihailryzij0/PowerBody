import React, { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginFormPage from "./pages/LoginFormPage";
import Profile from "./pages/Profile";
import PostsList from "./pages/PostsList";
import RequireAutch from "./components/hoc/RequireAutch";
const AdminWorkout = lazy(() => import("./pages/AdminWorkout"));
const GeneratorWorkout = lazy(() => import("./pages/GeneratorWorkout"));
import PostPage from "./pages/PostPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { getUserData } from "./store/slices/userDataSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import NavPanel from "./components/NavPanel/NavPanel";
import WithSuspense from "./components/hoc/WithSuspense";
import UserCreateWorkout from "./pages/UserCreateWorkout";

const AdminWorkoutSuspense = WithSuspense(AdminWorkout);
const GeneratorWorkoutSuspense = WithSuspense(GeneratorWorkout);
function App() {
  const { user, userData } = useAppSelector((state) => state);

  const dispach = useAppDispatch();

  useEffect(() => {
    if (user.isAuth) {
      dispach(getUserData());
    }
    if (process.env.NODE_ENV !== "development") {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js").then((registration) => {
            console.log("SW registered: ", registration);
          });
        });
      }
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAutch>
              <Profile />
            </RequireAutch>
          }
        />
        <Route
          path="/addWorkout"
          element={
            <RequireAutch>
              <AdminWorkoutSuspense />
            </RequireAutch>
          }
        />
        <Route
          path="/posts"
          element={
            <RequireAutch>
              <PostsList />
            </RequireAutch>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <RequireAutch>
              <PostPage />
            </RequireAutch>
          }
        />
        <Route
          path="/generator"
          element={
            <RequireAutch>
              <GeneratorWorkoutSuspense />
            </RequireAutch>
          }
        />
        <Route
          path="/userCreateWorkout"
          element={
            <RequireAutch>
              <UserCreateWorkout />
            </RequireAutch>
          }
        />
        <Route path="/login" element={<LoginFormPage />} />
      </Routes>
      {userData.status === "data-pending" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <NavPanel />
    </>
  );
}

export default App;
