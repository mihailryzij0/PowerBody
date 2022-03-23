import { Box } from "@mui/material";
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

  return (
    <>
      {userWorkout.status == "pending" ? (
        <div>loading</div>
      ) : (
        <Box>
          <ProfileWorkoutList workout={workout}></ProfileWorkoutList>
          <Header></Header>
        </Box>
      )}
    </>
  );
}

// loyd@gmail.com
