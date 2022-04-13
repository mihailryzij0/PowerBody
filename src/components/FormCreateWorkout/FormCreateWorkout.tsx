import { Button, styled, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Post } from "../../store/slices/cardsSlice";
import { setPostProps } from "../../store/slices/postSlice";
import InputFilePrevius from "./InputFilePrevius";
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

  const onSubmit: SubmitHandler<Required<Post>> = (formData) => {
    if (postKey === "vitamins") {
      const { workouts, ...formDataVitamin } = formData;
      handlerForm(formDataVitamin);
    } else {
      handlerForm(formData);
    }
  };
  const { nickname } = useAppSelector((state) => state.userWorkout);
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
  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFilePrevius />
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
        {postKey === "workouts" && <InputGrupWorkout />}
        <div className="form-workout-bottom">
          <Button variant="outlined" color="secondary" type="submit">
            Создать
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
