import { useState } from "react";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const CustomizedBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 30%;
  text-align: center;
`;

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
  errorMessage: string;
}

export function Form({ handleClick, title, errorMessage }: FormProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  function setHelperText() {
    switch (errorMessage) {
      case "Firebase: Error (auth/wrong-password).":
        console.log(errorMessage);
        return "Пароль введен не правильно";
      case "Firebase: Error (auth/user-not-found).":
        return "Пользователь не найден";
      case "Firebase: Error (auth/invalid-email).":
        return "email введен не правильно";
      case "Firebase: Error (auth/wrong-password).":
        return "Пароль введен не правильно";
      case "Firebase: Error (auth/wrong-password).":
        return "Пароль введен не правильно";
      default:
        return "Чтото пошло не так";
    }
  }

  return (
    <CustomizedBox component={"form"}>
      <Typography variant="h2">{title}</Typography>
      <Typography sx={{ color: "red" }} variant="h4">
        {errorMessage ? setHelperText() : ""}
      </Typography>
      <FormControl>
        <TextField
          value={email}
          error
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          sx={{ mt: "30px" }}
          label="email"
          variant="outlined"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="standard-error-helper-text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          label="password"
          sx={{ mt: "30px" }}
          variant="outlined"
        />
      </FormControl>
      <Button
        onClick={() => handleClick(email, pass)}
        sx={{ mt: "30px" }}
        variant="contained"
      >
        Ввод
      </Button>
    </CustomizedBox>
  );
}
