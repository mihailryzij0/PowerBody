import React, { useEffect, useState } from "react";
import SignUp from "../components/formAuth/SignUp";
import { Box, Button, Container } from "@mui/material";
import Login from "../components/formAuth/Login";
import { useAppSelector } from "../hooks/redux-hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Location } from "../components/hoc/RequireAuth";
export default function LoginFormPage() {
  const [inputSwitch, setInputSwitch] = useState(false);
  const handleClick = () => {
    inputSwitch ? setInputSwitch(false) : setInputSwitch(true);
  };
  const navigate = useNavigate();
  const location = useLocation() as Location;
  const { isAuth } = useAppSelector((state) => state.user);
  const fromPage = location.state?.from.pathname || "/";
  useEffect(() => {
    if (isAuth) {
      navigate(fromPage, { replace: true });
    }
  }, [isAuth]);
  return (
    <div className="container">
      <Box
        sx={{
          textAlign: "center",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth={"sm"}
      >
        {inputSwitch ? <SignUp /> : <Login />}
        <Button sx={{ marginTop: 2 }} onClick={handleClick}>
          {" "}
          {inputSwitch ? "Войти" : "Зарегистрироваться"}
        </Button>
      </Box>
    </div>
  );
}
