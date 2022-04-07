import React from "react";
import { FormAutch } from "./FormAutch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { signUpUser } from "../../store/slices/userSlice";

export default function SignUp() {
  const dispach = useAppDispatch();
  const { isAuth, status, error } = useAppSelector((state) => state.user);
  const hendleRegistr = (email: string, pass: string) => {
    dispach(signUpUser({ email, pass }));
  };
  return (
    <FormAutch
      title="регистрация"
      errorMessage={error}
      handleClick={hendleRegistr}
    />
  );
}
