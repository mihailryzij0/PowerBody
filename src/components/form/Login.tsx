import React from "react";
import { Form } from "./Form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { signInUser } from "../../store/slices/userSlice";

export default function Login() {
  const { isAuth, status, error } = useAppSelector((state) => state.user);
  const dispach = useAppDispatch();
  const hendleLogin = (email: string, pass: string) => {
    dispach(signInUser({ email, pass }));
  };
  return <Form title="Войти" errorMessage={error} handleClick={hendleLogin} />;
}
