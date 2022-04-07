import { useState } from "react";
import React from "react";
import {useForm} from "react-hook-form"
import {
  Box,
  Button,
  FormControl,
  FormGroup,
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

const CustomizedForm = styled('form')`
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

export function FormAutch({ handleClick, title, errorMessage }: FormProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  function setHelperText() {
    switch (errorMessage) {
      case "Firebase: Error (auth/wrong-password).":
        return "Пароль введен не правильно";
      case "Firebase: Error (auth/user-not-found).":
        return "Пользователь не найден";
      case "Firebase: Error (auth/invalid-email).":
        return "email введен не правильно";
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return "Пароль должен содержать минимум 6 символов";
      default:
        return "Чтото пошло не так";
    }
  }
  const {register,
        formState:{
          errors,
          isValid
        },
        handleSubmit,
        reset
      } = useForm({
        mode: 'onBlur'
      })

 const onSubmit= (data: any) => {
   alert(JSON.stringify(data));
   reset()
  }

  return (
    <CustomizedBox >
      <Typography variant="h2">{title}</Typography>
      <Typography sx={{ color: "red" }} variant="h4">
        {errorMessage ? setHelperText() : ""}
      </Typography>
      <CustomizedForm onSubmit={handleSubmit(onSubmit)} >

        <TextField
        {...register('email',{
        required:true})
      }
          type="email"
          sx={{ mt: "30px" }}
          label="email"
          variant="outlined"
        />
        <TextField
         {...register('password',{
            required: 'поле обьзательно для заполнения',
            minLength:{
              value:6,
              message:'поле обьязательно для заполнения'
            }
          })
           }
          
          type="password"
          label="password"
          sx={{ mt: "30px" }}
          variant="outlined"
        />
      <Button
        disabled={!isValid}
        type="submit"
        sx={{ mt: "30px" }}
        variant="contained"
      >
        Ввод
      </Button>
   </CustomizedForm>
    </CustomizedBox>
  );
}
