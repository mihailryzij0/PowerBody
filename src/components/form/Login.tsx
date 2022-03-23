import React from "react";
import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser, signInUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";

export default function Login() {
  const dispach = useAppDispatch();
  let navigate = useNavigate();
  const hendleLogin = (email: string, pass: string) => {
    let auch =  getAuth()
    dispach(signInUser({ email, pass}))
  };
  return <Form title="Войти" handleClick={hendleLogin} />;
}
