import {
  Box,
  Container,
  IconButton,
  styled,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import FormCreateWorkout, {
  WorkoutForm,
} from "../components/FormCreateWorkout/FormCreateWorkout";
import { useAppDispatch } from "../hooks/redux-hooks";
import { createPost } from "../store/slices/createPostSlice";

type postKey = "vitamins" | "workouts";
export default function AdminWorkout() {
  const [postKey, setPostKey] = useState<postKey>("vitamins");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: postKey
  ) => {
    setPostKey(newChoice);
  };
  const dispach = useAppDispatch();
  const handleSubmit = async (postData: WorkoutForm) => {
    if (postData.image) {
      dispach(createPost({ postData, postKey }));
    }
  };
  const MyBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    text-align: center;
  `;
  const navigate = useNavigate();

  return (
    <Container maxWidth={"sm"} sx={{ textAlign: "center", marginBottom: 20 }}>
      <MyBox>
        <ToggleButtonGroup
          color="primary"
          value={postKey}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="workouts">Тренировка</ToggleButton>
          <ToggleButton value="vitamins">Курс</ToggleButton>
        </ToggleButtonGroup>

        <FormCreateWorkout postKey={postKey} handlerForm={handleSubmit} />
      </MyBox>
      <IconButton
        sx={{
          position: "fixed",
          top: "20px",
          left: "10px",
          color: "black",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Header></Header>
    </Container>
  );
}
