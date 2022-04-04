import { Backdrop, Container } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUserWorkout } from "../store/slices/userWorkoutSlice";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile() {
  const { user, userWorkout } = useAppSelector((state) => state);
  const { workout } = userWorkout;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userWorkout.status !== "fulfilled") {
      dispatch(getUserWorkout(user.idUser));
    }
  }, []);
  return (
    <Container maxWidth={"sm"}>
      {userWorkout.status == "pending" ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ProfileContent  />
      )}
      <Header></Header>
    </Container>
  );
}
