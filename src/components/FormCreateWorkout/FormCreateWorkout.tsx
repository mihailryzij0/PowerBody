import {
  Button,
  MenuItem,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Workout } from "../../store/slices/types";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import InputFileImgPreview from "./InputFileImgPreview";
import InputGroupWorkout from "./InputGroupWorkout";
import { FormInputSlider } from "./SliderForm";

export interface WorkoutForm {
  authorId: string | null;
  author: string;
  image: File[] | null;
  video: string | null;
  description: string;
  typeWorkout: string;
  title: string;
  id: string;
  weeks: number;
  workouts?: Array<Workout>;
  comments: [];
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
      id: new Date().valueOf().toString(),
      weeks: 6,
      workouts: [
        {
          exercises: [""],
          workoutName: "",
        },
      ],
      image: null,
      video: null,
      comments: [],
    },
  });
  const { register, handleSubmit, reset, watch } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFileImgPreview />
        <FormInputSlider name="weeks" />
        <TextField
          inputProps={{ "data-testid": "inputYoutube" }}
          fullWidth={true}
          label="Ссылка видио youtube"
          margin="normal"
          variant="outlined"
          {...register(`video`)}
        />
        <YoutubeEmbed linkYouTubeVideo={watch("video")} />
        <TextField
          inputProps={{ "data-testid": "title" }}
          fullWidth={true}
          label="Заголовок"
          margin="normal"
          variant="outlined"
          {...register(`title`, {
            required: "поле обязательно для заполнения",
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
          <MenuItem value="На массу">На массу</MenuItem>
          <MenuItem value="На сушку">На сушку</MenuItem>
          <MenuItem value="На выносливость">На выносливость</MenuItem>
        </TextField>
        <AdminTextareaAutosize
          {...register("description", {
            required: "поле обязательно для заполнения",
          })}
          data-testid={"description"}
          aria-label="minimum height"
          placeholder="Описание тренировки"
        />
        {postKey === "workouts" ? (
          <InputGroupWorkout />
        ) : (
          <Button
            data-testid={"buttonSubmit"}
            sx={{ marginTop: "20px" }}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Создать
          </Button>
        )}
        {status === "fulfilled" && <Typography> Готово!! </Typography>}
        {status === "pending" && <Typography>Loading...</Typography>}
      </form>
    </FormProvider>
  );
}
