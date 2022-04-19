import React from "react";
import { FormAuth } from "./FormAuth";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { signInUser } from "../../store/slices/userSlice";

export interface UserDataForm {
  email: string;
  pass: string;
  nickname?: string;
}

export default function Login() {
  const dispach = useAppDispatch();
  const hendleLogin = (userData: UserDataForm) => {
    dispach(signInUser(userData));
  };
  return <FormAuth title="Войти" onSubmit={hendleLogin} />;
}
