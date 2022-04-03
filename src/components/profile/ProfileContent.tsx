import {
  Box,
  Button,
  Container,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { removeUser } from "../../store/slices/userSlice";
import ProfileWorkoutList from "./ProfileWorkoutList";

export default function ProfileContent() {
  const MyBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    text-align: center;
  `;
  const ProfileText = styled(Typography)`
    margin-top: 20px;
    margin-bottom: 20px;
  `;
  const dicpatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dicpatch(removeUser());
    navigate("/");
  };

  const { workout } = useAppSelector((state) => state.userWorkout);
  return workout ? (
    <Container>
      <Button sx={{ left: "80%", top: "5%" }} variant="outlined">
        Выйти
      </Button>
      <MyBox>
        <ProfileText sx={{ maxWidth: "60%" }} variant="h4">
          {workout.title}
        </ProfileText>
        <Rating name="size-medium" defaultValue={Number(workout.rating)} />
        <ProfileText variant="subtitle1" gutterBottom sx={{ maxWidth: "70%" }}>
          {workout.description}
        </ProfileText>
      </MyBox>
      <ProfileWorkoutList workout={workout}></ProfileWorkoutList>
    </Container>
  ) : (
    <Typography>Здесб будет ваша тренировка</Typography>
  );
}
