import { TextField, Typography } from "@mui/material";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Post, Workout } from "../store/slices/types";
import InputGrupWorkout from "../components/FormCreateWorkout/InputGrupWorkout";
import { FormInputSlider } from "../components/FormCreateWorkout/SliderForm";
import {
  updateUserData,
  updateUserWorkout,
} from "../store/slices/userDataSlice";
import { useNavigate } from "react-router-dom";

export interface WorkoutForm {
  authorId: string | null;
  author: string;
  image: File[] | null;
  vidio: string | null;
  description: string;
  typeWorkout: string;
  rating: string;
  title: string;
  id: number;
  workouts?: Array<Workout>;
}

export default function UserCreateWorkout() {
  const {
    user: { idUser },
    userData: { nickname, status },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<Required<WorkoutForm>>({
    defaultValues: {
      title: "",
      description: "",
      typeWorkout: "",
      authorId: idUser,
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
      vidio: null,
    },
  });

  const onSubmit = (workout: Required<WorkoutForm>) => {
    dispatch(updateUserWorkout(workout));
    dispatch(updateUserData());
  };
  const { register, handleSubmit, reset } = methods;
  return (
    <div className="user-create-workout">
      <div className="user-create-workout__box container">
        <div className="user-create-workout__header">
          <Typography mt={3} mb={2} variant="h4" textAlign={"center"}>
            {" "}
            Создай свою тренировку !!!{" "}
          </Typography>
          <Typography variant="subtitle2" textAlign={"center"}>
            Выбери сколько недель будет твоя тренировка и составь план на
            неделю. Все просто !
          </Typography>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputSlider name="weeks" />
            <TextField
              fullWidth={true}
              label="Заголовок"
              margin="normal"
              variant="outlined"
              {...register(`title`, {
                required: "поле обьзательо для заполнения",
              })}
            />
            <InputGrupWorkout />
            {status === "setData-fulfilled" && (
              <Typography> Готово!! </Typography>
            )}
            {status === "setData-pending" && (
              <Typography>Loadimg...</Typography>
            )}
            {status === "setData-rejected" && (
              <Typography>Загрузка не удалась попробуйте позже</Typography>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
