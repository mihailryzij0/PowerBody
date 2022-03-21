import React from "react";
import { Route, Routes } from "react-router-dom";
import { getColectionFirebase, setItemFirebase } from "./firebaseAPI";
import HomePage from "./pages/HomePage";
import LoginFormPage from "./pages/LoginFormPage";
import Profile from "./pages/Profile";
import PostsList from "./pages/PostsList";
import WorkoutProgram from "./pages/WorkoutProgram";
import Singlepage from "./pages/Singlepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/posts" element={<PostsList />} />
      <Route path="/posts/:id" element={<Singlepage />} />
      <Route path="/WorkoutProgram" element={<WorkoutProgram />} />
      <Route path="/LoginFormPage" element={<LoginFormPage />} />
    </Routes>
  );
}

export default App;
