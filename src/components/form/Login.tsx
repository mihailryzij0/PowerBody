import React from "react";
import { FormAutch } from "./FormAutch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { signInUser } from "../../store/slices/userSlice";

export default function Login() {
  const { isAuth, status, error } = useAppSelector((state) => state.user);
  const dispach = useAppDispatch();
  const hendleLogin = (email: string, pass: string) => {
    dispach(signInUser({ email, pass }));
  };
  return <FormAutch title="Войти" errorMessage={error} handleClick={hendleLogin} />;
}
