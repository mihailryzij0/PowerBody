import React, { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginFormPage from "./pages/LoginFormPage";
import Profile from "./pages/Profile";
import PostsList from "./pages/PostsList";
import RequireAuth from "./components/hoc/RequireAuth";
const AdminWorkout = lazy(() => import("./pages/AdminWorkout"));
const GeneratorWorkout = lazy(() => import("./pages/GeneratorWorkout"));
import PostPage from "./pages/PostPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { getUserData } from "./store/slices/userDataSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import NavPanel from "./components/NavPanel/NavPanel";
import WithSuspense from "./components/hoc/WithSuspense";
import UserCreateWorkout from "./pages/UserCreateWorkout";
import { onAuthChanged, setUser } from "./store/slices/userSlice";

const AdminWorkoutSuspense = WithSuspense(AdminWorkout);
const GeneratorWorkoutSuspense = WithSuspense(GeneratorWorkout);
function App() {
  const { userData } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onAuthChanged());
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
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/addWorkout"
          element={
            <RequireAuth>
              <AdminWorkoutSuspense />
            </RequireAuth>
          }
        />
        <Route
          path="/posts"
          element={
            <RequireAuth>
              <PostsList />
            </RequireAuth>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <RequireAuth>
              <PostPage />
            </RequireAuth>
          }
        />
        <Route
          path="/generator"
          element={
            <RequireAuth>
              <GeneratorWorkoutSuspense />
            </RequireAuth>
          }
        />
        <Route
          path="/userCreateWorkout"
          element={
            <RequireAuth>
              <UserCreateWorkout />
            </RequireAuth>
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
