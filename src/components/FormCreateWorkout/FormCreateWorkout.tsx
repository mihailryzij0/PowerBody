import {
  Button,
  Snackbar,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Post, setPostProps } from "../../store/slices/postSlice";
import InputFileImgPreview from "./InputFileImgPreview";
import InputGrupWorkout from "./InputGrupWorkout";

export interface AdminWorkoutProps {
  postKey: "vitamins" | "workouts";
  handlerForm: (formData: setPostProps) => void;
}

export default function FormCreateWorkout({
  postKey,
  handlerForm,
}: AdminWorkoutProps) {
  const AdminTextareaAutosize = styled(TextareaAutosize)`
    min-height: 100px;
    min-width: 98%;
    margin-top: 40px;
  `;

  const {
    userData: { nickname },
    setImage: { status },
  } = useAppSelector((state) => state);
  const onSubmit: SubmitHandler<Required<Post>> = (formData) => {
    if (postKey === "vitamins") {
      const { workouts, ...formDataVitamin } = formData;
      handlerForm(formDataVitamin);
    } else {
      handlerForm(formData);
    }
    if (status === "fulfilled") {
      reset();
    }
  };

  const methods = useForm<Required<Post>>({
    defaultValues: {
      title: "",
      description: "",
      author: nickname,
      id: new Date().valueOf(),
      rating: "4",
      workouts: [
        {
          exercises: [""],
          workoutName: "",
        },
      ],
      image: null,
    },
  });
  const { register, handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFileImgPreview />
        <TextField
          fullWidth={true}
          label="Заголовок"
          margin="normal"
          variant="outlined"
          {...register(`title`, {
            required: "поле обьзательо для заполнения",
          })}
        />

        <AdminTextareaAutosize
          {...register("description", {
            required: "поле обьзательо для заполнения",
          })}
          aria-label="minimum height"
          placeholder="Описание тренировки"
        />
        {postKey === "workouts" ? (
          <InputGrupWorkout />
        ) : (
          <Button
            sx={{ marginTop: "20px" }}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Создать
          </Button>
        )}
        {status === "fulfilled" && <Typography> Готово!! </Typography>}
        {status === "pending" && <Typography>Loadimg...</Typography>}
      </form>
    </FormProvider>
  );
}
