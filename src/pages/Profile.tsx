import { Backdrop, Box, Container, Rating, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import Header from "../components/header/Header";
import ProfileWorkoutList from "../components/profile/ProfileWorkoutList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUserWorkout } from "../store/slices/userWorkoutSlice";
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {
  const { user, userWorkout } = useAppSelector((state) => state);
  const { workout } = userWorkout;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(userWorkout.status !== 'fulfilled'){
      dispatch(getUserWorkout(user.idUser));
    }
  }, []);

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

  return (
    <>
      <Container maxWidth={"sm"}>
        {userWorkout.status == "pending" ? (
          <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Box>
            <MyBox>
              <ProfileText variant="h3">{workout.title}</ProfileText>
              <Rating
                name="size-medium"
                defaultValue={Number(workout.rating)}
              />
              <ProfileText>{workout.description}</ProfileText>
            </MyBox>
            <ProfileWorkoutList workout={workout}></ProfileWorkoutList>
            
          </Box>
        )}
        <Header></Header>
      </Container>
    </>
  );
}

// loyd@gmail.com
