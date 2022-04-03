import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setPostCards } from "../../store/slices/cardsSlice";
import { setPostData } from "../../store/slices/postSlice";

export default function InputArray({ postKey }: Record<string, string>) {
  const [post, setPost] = useState({
    description: "",
    id: new Date().getUTCMilliseconds(),
    rating: "4",
    title: "",
    workouts: [
      {
        exercises: ["", "", "", "", "", ""],
        workoutName: "",
      },
      {
        exercises: ["", "", "", "", "", ""],
        workoutName: "",
      },
      {
        exercises: ["", "", "", "", "", ""],
        workoutName: "",
      },
    ],
  });

  let newPost = JSON.parse(JSON.stringify(post));
  const setWorkoutInput =
    (parentIndex: number, index: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      newPost.workouts[parentIndex].exercises[index] = e.target.value;
      setPost(newPost);
    };
  const setWorkoutNameInput =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      newPost.workouts[index].workoutName = e.target.value;
      setPost(newPost);
    };
  const setNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    newPost.title = e.target.value;
    setPost(newPost);
  };
  const setDescriptionInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    newPost.description = e.target.value;
    setPost(newPost);
  };
  const dispatch = useAppDispatch();
  const handleClick = () => {
    const { workouts, description, ...cardsData } = post;
    if (postKey === "vitamins") {
      const { workouts, ...vitaminPostData } = post;
      dispatch(setPostData(vitaminPostData));
      dispatch(setPostCards({ cardsData, postKey }));
      console.log(cardsData);
    } else {
      dispatch(setPostData(post));
      dispatch(setPostCards({ cardsData, postKey }));
    }
  };

  return (
    <>
      <TextField
        value={post.title}
        fullWidth
        label="Назавание тренировки"
        onChange={setNameInput}
      />
      <TextareaAutosize
        onChange={setDescriptionInput}
        value={post.description}
        aria-label="minimum height"
        placeholder="Введите описание"
        style={{ minWidth: "100%", minHeight: "200px", marginTop: "40px" }}
      />
      {postKey === "workouts" &&
        post.workouts.map((element, i) => (
          <Box mt={1} mb={1}>
            <Typography> {i + 1} день </Typography>
            <TextField
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              value={element.workoutName}
              fullWidth
              label="Тренировка"
              onChange={setWorkoutNameInput(i)}
            />
            {element.exercises.map((el, index) => (
              <TextField
                value={el}
                onChange={setWorkoutInput(i, index)}
                key={index}
                fullWidth
                label="Упражнение"
              />
            ))}
          </Box>
        ))}
      <Button onClick={() => handleClick()}>Создать</Button>
    </>
  );
}
