import { Backdrop, Container } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUserData } from "../store/slices/userDataSlice";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile() {
  const { user, userData } = useAppSelector((state) => state);

  return (
    <Container maxWidth={"sm"}>
      {userData.status == "pending" ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ProfileContent />
      )}
      <Header></Header>
    </Container>
  );
}
