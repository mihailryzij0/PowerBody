import { Box, Typography, Rating, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Post } from "../../store/slices/cardsSlice";
import { setUserWorkout } from "../../store/slices/userWorkoutSlice";
import Header from "../header/Header";
import WorkoutList from "./WorkoutList";

export default function Workout({ postData }: any) {
  const { title, description, workouts, rating } = postData;
  const { idUser } = useAppSelector((state) => state.user);
  const dispach = useAppDispatch();
  const navigate = useNavigate();
  const [successButton, setSuccessButton] = useState(false);

  const handleClick = () => {
    dispach(setUserWorkout(postData));
    setSuccessButton(true);
  };
  return (
    <>
      <Box sx={{ position: "relative", overflow: "contain", height: "200px" }}>
        <img
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={require("../../assets/fon.jpg")}
        ></img>
        <Rating
          sx={{ position: "absolute", right: "20px", bottom: "20px" }}
          name="size-large"
          disabled={true}
          defaultValue={Number(rating)}
        />
      </Box>
      <Typography mt={2} variant="h4" align="center">
        {title}
      </Typography>
      <Typography mt={2} mb={2} variant="body2" align="center">
        {description}
      </Typography>
      <Box sx={{ m: "0 auto", width: "max-content" }}>
        {successButton ? (
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="success"
          >
            перейти в ЛК
          </Button>
        ) : (
          <Button onClick={handleClick} variant="contained" color="success">
            Добавить
          </Button>
        )}
      </Box>

      <Box sx={{ mt: "50px" }}>
        <WorkoutList workouts={workouts} />
        <Header />
      </Box>
    </>
  );
}
