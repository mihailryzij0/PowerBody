import React from "react";
import { Form } from "./Form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { signUpUser } from "../../store/slices/userSlice";

export default function SignUp() {
  const dispach = useAppDispatch();
  const { isAuth, status, error } = useAppSelector((state) => state.user);
  const hendleRegistr = (email: string, pass: string) => {
    dispach(signUpUser({ email, pass }));
  };
  return <Form title="регистрация" errorMessage={error} handleClick={hendleRegistr} />;
}
