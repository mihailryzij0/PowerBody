import { Box } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/header/Header";
import { useAppSelector } from "../hooks/redux-hooks";

export default function Profile() {
  const { isAuth} =  useAppSelector((state) => state.user);
  return !isAuth ? (
    <Box>
      <Navigate to="/LoginFormPage" replace />
      <Header></Header>
    </Box>
  ) : (
    <Box>
      <Header></Header>
    </Box>
  );
}
