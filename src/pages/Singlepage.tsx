import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getPostData } from "../store/slices/postSlice";
import Workout from "../components/Post/Workout";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { setUserWorkout } from "../store/slices/userWorkoutSlice";

export default function Singlepage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispach = useAppDispatch();

  const { post, user } = useAppSelector((state) => state);

  const { postData, status, error } = post;
  const { isAuth, email, token, idUser } = user;
  useEffect(() => {
    if (id === postData.id) {
      return;
    } else {
      dispach(getPostData(id));
    }
  }, []);

  const handleClick = () => {
    isAuth && token
      ? dispach(setUserWorkout({ workout: postData, idUser }))
      : console.log("kdkdk");
  };

  return (
    <>
      {status === "pending" ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <Workout postData={postData} />
          <IconButton
            sx={{
              position: "fixed",
              top: "20px",
              left: "10px",
              color: "white",
            }}
            onClick={() => {
              navigate(-1);
            }}
            aria-label="delete"
          >
            <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton onClick={handleClick}>
            <AddCircleIcon />
          </IconButton>
        </>
      )}

      <Header />
    </>
  );
}
