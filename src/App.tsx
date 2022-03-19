import React from "react";
import {Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import RegisterPage from "./pages/RegisterPage";
import WorkoutList from "./pages/WorkoutList";
import WorkoutProgram from "./pages/WorkoutProgram";
 



function App() {

  return(
      <Routes>
      <Route  path="/" element={<HomePage/>}/>
      <Route  path="/RegisterPage" element={<RegisterPage/>}/>
      <Route  path="/Profile" element={<Profile/>}/>
      <Route  path="/WorkoutList" element={<WorkoutList/>}/>
      <Route  path="/WorkoutProgram" element={<WorkoutProgram/>}/>
      </Routes>
  )
}

export default App;

