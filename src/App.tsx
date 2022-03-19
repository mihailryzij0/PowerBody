import React from "react";
import {Route, Routes } from "react-router-dom";
import { getColectionFirebase, setItemFirebase } from "./firebaseAPI";
import HomePage from "./pages/HomePage";
import LoginFormPage from "./pages/LoginFormPage";
import Profile from "./pages/Profile";
import WorkoutList from "./pages/WorkoutList";
import WorkoutProgram from "./pages/WorkoutProgram";
 



function App() {
  return(
      <Routes>
        <Route  path="/" element={<HomePage/>}/>
        <Route  path="/Profile" element={<Profile/>}/>
        <Route  path="/WorkoutList" element={<WorkoutList/>}/>
        <Route  path="/WorkoutProgram" element={<WorkoutProgram/>}/>
        <Route  path="/LoginFormPage" element={<LoginFormPage/>}/>
      </Routes>
  )
}

export default App;

