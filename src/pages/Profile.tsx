import { Box, Container, Rating, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import Header from "../components/header/Header";
import ProfileWorkoutList from "../components/profile/ProfileWorkoutList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUserWorkout } from "../store/slices/userWorkoutSlice";

export default function Profile() {
  const { user, userWorkout } = useAppSelector((state) => state);
  const { workout } = userWorkout;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserWorkout(user.idUser));
  }, []);

  const MyBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  `;
  const ProfileText = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
  `

  return (
    <>
      <Container>
        {userWorkout.status == "pending" ? (
          <div>loading</div>
        ) : (
          <Box>
            <MyBox>
              <ProfileText variant="h3">
                {workout.title}
              </ProfileText>
              <Rating
                name="size-medium"
                defaultValue={Number(workout.rating)}
              />
              <ProfileText>{workout.description}</ProfileText>
            </MyBox>
            <ProfileWorkoutList workout={workout}></ProfileWorkoutList>
            <Header></Header>
          </Box>
        )}
      </Container>
    </>
  );
}

// loyd@gmail.com
