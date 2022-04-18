import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { UserDataForm } from "./Login";
import { useAppSelector } from "../../hooks/redux-hooks";

interface FormProps {
  title: string;
  onSubmit: (userData: UserDataForm) => void;
}

export function FormAuth({ onSubmit, title }: FormProps) {
  const { error, status } = useAppSelector((state) => state.user);

  function setHelperText() {
    switch (error) {
      case "Firebase: Error (auth/wrong-password).":
        return "Пароль введен не правильно";
      case "Firebase: Error (auth/user-not-found).":
        return "Пользователь не найден";
      case "Firebase: Error (auth/invalid-email).":
        return "email введен не правильно";
      default:
        return "Чтото пошло не так";
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDataForm>({
    mode: "onBlur",
  });

  return (
    <div className="auth-form">
      <Typography variant="h2">{title}</Typography>
      <Typography sx={{ color: "red" }} variant="body1">
        {error ? setHelperText() : " "}
      </Typography>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        {title === "Регистрация" && (
          <TextField
            {...register("nickname", {
              required: "поле обьзательно для заполнения",
            })}
            type="text"
            label="псевдоним"
            variant="outlined"
            fullWidth={true}
            margin="normal"
          />
        )}
        <TextField
          {...register("email", {
            required: "поле обьзательо для заполнения",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "email введен не правильно",
            },
          })}
          type="email"
          label="email"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          error={!!errors?.email?.message}
          helperText={errors?.email?.message || " "}
        />
        <TextField
          {...register("pass", {
            required: "поле обьзательно для заполнения",
            minLength: {
              value: 6,
              message: "пароль минимум 6 символов",
            },
          })}
          fullWidth={true}
          type="password"
          label="password"
          margin="normal"
          variant="outlined"
          error={!!errors?.pass?.message}
          helperText={errors?.pass?.message || " "}
        />
        <Box position={{ position: "relative" }}>
          <Button
            fullWidth={true}
            type="submit"
            disabled={status === "pending"}
            variant="contained"
          >
            Ввод
          </Button>
          {status === "pending" && (
            <CircularProgress
              size={24}
              sx={{
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </div>
  );
}
