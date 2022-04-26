import {
  Button,
  MenuItem,
  Slider,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { setUIValue } from "@testing-library/user-event/dist/types/document";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Workout } from "../../store/slices/types";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import InputFileImgPreview from "./InputFileImgPreview";
import InputGrupWorkout from "./InputGrupWorkout";
import { FormInputSlider } from "./SliderForm";

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
  weeks: number;
  workouts?: Array<Workout>;
}

export interface AdminWorkoutProps {
  postKey: "vitamins" | "workouts";
  handlerForm: (formData: any) => void;
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
    user: { idUser },
    userData: { nickname },
    createPost: { status },
  } = useAppSelector((state) => state);

  const onSubmit: SubmitHandler<Required<WorkoutForm>> = (formData) => {
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

  const methods = useForm<Required<WorkoutForm>>({
    defaultValues: {
      title: "",
      description: "",
      typeWorkout: "",
      authorId: idUser,
      author: nickname,
      id: new Date().valueOf(),
      rating: "4",
      weeks: 6,
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
  const { register, handleSubmit, reset, watch } = methods;
  const vidio = watch("vidio")?.split("=").pop() as string;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFileImgPreview />
        <FormInputSlider name="weeks" />
        <TextField
          fullWidth={true}
          label="Ссылка видио youtube"
          margin="normal"
          variant="outlined"
          {...register(`vidio`)}
        />
        <YoutubeEmbed embedId={vidio} />
        <TextField
          fullWidth={true}
          label="Заголовок"
          margin="normal"
          variant="outlined"
          {...register(`title`, {
            required: "поле обьзательо для заполнения",
          })}
        />
        <TextField
          select
          variant="outlined"
          fullWidth
          label="Тип тренировки"
          defaultValue=""
          inputProps={register("typeWorkout", {
            required: "Please enter currency",
          })}
        >
          <MenuItem value="Стандарт">Стандарт</MenuItem>
          <MenuItem value={"На массу"}>На массу</MenuItem>
          <MenuItem value={"На сушку"}>На сушку</MenuItem>
          <MenuItem value={"На выносливость"}>На выносливость</MenuItem>
        </TextField>
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
