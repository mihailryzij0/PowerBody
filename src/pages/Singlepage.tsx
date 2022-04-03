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
import { green } from "@mui/material/colors";

export default function Singlepage() {
  const { id } = useParams();
  useEffect(() => {
    dispach(getPostData(id));
  }, []);
  const navigate = useNavigate();
  const { post } = useAppSelector((state) => state);
  const dispach = useAppDispatch();
  const { postData, status, error } = post;

  return (
    <>
      {status === "pending" || postData === null ? (
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
        </>
      )}

      <Header />
    </>
  );
}
