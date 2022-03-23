import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { useAppSelector } from "../hooks/redux-hooks";

export default function Profile() {
  const { isAuth, status} =  useAppSelector((state) => state.user); 
  return  (
    <Box>
      <Header></Header>
    </Box>
  );
}
