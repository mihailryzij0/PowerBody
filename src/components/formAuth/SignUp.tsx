import React from "react";
import { FormAuth } from "./FormAuth";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { signUpUser } from "../../store/slices/userSlice";
import { UserDataForm } from "./Login";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const handleRegister = (userData: UserDataForm) => {
    dispatch(signUpUser(userData));
  };
  return <FormAuth title="Регистрация" onSubmit={handleRegister} />;
}
