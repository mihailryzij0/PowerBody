import React from "react";
import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser, signInUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

export default function Login() {
  const { isAuth, status} =  useAppSelector((state) => state.user);
  const dispach = useAppDispatch();
  const navigate = useNavigate();
  const hendleLogin = (email: string, pass: string) => {
    let auch =  getAuth()
    dispach(signInUser({ email, pass}))
    if(isAuth) navigate('/Profile')
  };
  return <Form title="Войти" handleClick={hendleLogin} />;
}
