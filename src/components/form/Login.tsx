import React from "react";
import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";

export default function Login() {
  const dispach = useAppDispatch();
  let navigate = useNavigate();
  const hendleLogin = (email: string, pass: string) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, pass)
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
  return <Form title="Войти" handleClick={hendleLogin} />;
}
