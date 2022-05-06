import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Workout } from "../store/slices/types";
import InputGroupWorkout from "../components/FormCreateWorkout/InputGroupWorkout";
import { FormInputSlider } from "../components/FormCreateWorkout/SliderForm";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import {
  updateUserData,
  updateUserWorkout,
} from "../store/slices/userDataSlice";
import { useNavigate } from "react-router-dom";
import WorkoutList from "../components/Post/WorkoutList";

export interface WorkoutForm {
  authorId: string | null;
  author: string;
  image: File[] | null;
  video: string | null;
  description: string;
  typeWorkout: string;
  title: string;
  id: string;
  workouts?: Array<Workout>;
  weeks: number;
}

export default function UserCreateWorkout() {
  const {
    user: { idUser },
    userData: { nickname, status },
  } = useAppSelector((state) => state);
  const [newWorkout, setNewWorkout] = useState<null | Required<WorkoutForm>>(
    null
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<Required<WorkoutForm>>({
    defaultValues: {
      title: "",
      description: "",
      typeWorkout: "",
      authorId: idUser,
      author: nickname,
      id: "UserWorkout",
      workouts: [
        {
          exercises: [""],
          workoutName: "",
        },
      ],
      weeks: 6,
      image: null,
      video: null,
    },
  });

  const { register, handleSubmit, reset } = methods;

  const onSubmit = (workout: Required<WorkoutForm>) => {
    setNewWorkout(workout);
  };
  const handleClick = async () => {
    if (newWorkout) {
      newWorkout.workouts = [].concat(
        ...(Array.from({ length: newWorkout.weeks }).fill(
          newWorkout.workouts
        ) as [])
      );
      dispatch(updateUserWorkout(newWorkout));
      await dispatch(updateUserData());
      if (status !== "setData-rejected") {
        navigate("/");
        reset();
      }
    }
  };
  return (
    <div className="user-create-workout">
      <div className="user-create-workout__box container">
        <div className="user-create-workout__header">
          <Typography mt={3} mb={2} variant="h4" textAlign={"center"}>
            {" "}
            Создай свою тренировку !!!{" "}
          </Typography>
          <Typography variant="subtitle2" textAlign={"center"}>
            Программа автоматически создаст цикл тренировок на указанное вами
            количество недель, заполните форму и нажмите создать.
          </Typography>
        </div>
        {status === "setData-rejected" && (
          <Typography>Загрузка не удалась попробуйте позже</Typography>
        )}

        {!newWorkout ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInputSlider name="weeks" />
              <TextField
                fullWidth={true}
                label="Заголовок"
                margin="normal"
                variant="outlined"
                {...register(`title`, {
                  required: "поле обязательно для заполнения",
                })}
              />
              <InputGroupWorkout />
            </form>
          </FormProvider>
        ) : (
          <>
            <WorkoutList workouts={newWorkout.workouts} />
            <div className="user-create-workout__preview-btn">
              <Button
                onClick={() => setNewWorkout(null)}
                variant="contained"
                color="secondary"
                sx={{ mt: "20px", mr: "10px" }}
              >
                Сделать изменения
              </Button>
              <Button
                onClick={handleClick}
                variant="contained"
                color="success"
                sx={{ mt: "20px", ml: "10px" }}
              >
                Добавить тренировку
              </Button>
            </div>
          </>
        )}
        <IconButton
          sx={{
            position: "fixed",
            top: "20px",
            left: "10px",
            color: "white",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </div>
    </div>
  );
}
