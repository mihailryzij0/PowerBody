import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginFormPage from "./pages/LoginFormPage";
import Profile from "./pages/Profile";
import PostsList from "./pages/PostsList";
import Singlepage from "./pages/PostPage";
import RequireAutch from "./components/hoc/RequireAutch";
import IndividualWorkout from "./pages/IndividualWorkout";
import AdminWorkout from "./pages/AdminWorkout";
import PostPage from "./pages/PostPage";

function App() {
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
      <Route path="/individual" element={<IndividualWorkout />} />
      <Route path="/login" element={<LoginFormPage />} />
    </Routes>
  );
}

export default App;
