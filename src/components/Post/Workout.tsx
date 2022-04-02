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
    if (successButton) {
      navigate("/");
    } else {
      dispach(setUserWorkout(postData));
      setSuccessButton(true);
    }
  };

  const MyButton = () => {
    return successButton ? (
      <Button color="success" variant="contained" onClick={handleClick}>
        {" "}
        Перейти в ЛК{" "}
      </Button>
    ) : (
      <Button color="primary" variant="contained" onClick={handleClick}>
        {" "}
        Добавить{" "}
      </Button>
    );
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
      {workouts.length > 1 && (
        <>
          <Box sx={{ m: "0 auto", width: "max-content" }}>
            <MyButton />
          </Box>
          <Box sx={{ mt: "50px" }}>
            <WorkoutList workouts={workouts} />
            <Header />
          </Box>
        </>
      )}
    </>
  );
}
