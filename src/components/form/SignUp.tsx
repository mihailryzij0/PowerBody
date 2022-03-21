import React from "react";
import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";

export default function SignUp() {
  const dispach = useAppDispatch();
  let navigate = useNavigate();
  const hendleRegistr = (email: string, pass: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        console.log(user);
        dispach(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/Profile");
      })
      .catch(console.error);
  };
  return <Form title="регистрация" handleClick={hendleRegistr} />;
}
