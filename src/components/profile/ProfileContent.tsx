import { Box, Container, Rating, styled, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import ProfileTopInfo from "./ProfileTopInfo";
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

  const { workout, avatarImg } = useAppSelector((state) => state.userData);
  return workout ? (
    <Container>
      <ProfileTopInfo image={avatarImg} />
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
