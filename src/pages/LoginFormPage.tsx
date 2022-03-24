import Header from "../components/header/Header";
import React, { useEffect, useState } from "react";
import SignUp from "../components/form/SignUp";
import { Button, Container } from "@mui/material";
import Login from "../components/form/Login";
import { useAppSelector } from "../hooks/redux-hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Location } from "../components/hoc/RequireAutch";
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
    <Container>
      <Header />
      <main>
        {inputSwitch ? <SignUp /> : <Login />}
        <Button onClick={handleClick}>регистрация</Button>
      </main>
    </Container>
  );
}
