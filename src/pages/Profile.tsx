import { Box } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/header/Header";
import useAuth from "../hooks/use-auth";

export default function Profile() {
  const { isAuth, email } = useAuth();
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
