import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/NavPanel/NavPanel";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getPostData } from "../store/slices/postSlice";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { CircularProgress, IconButton } from "@mui/material";
import PostContent from "../components/Post/PostContent";

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
          <PostContent postData={postData} />
          <IconButton
            sx={{
              position: "fixed",
              top: "20px",
              left: "10px",
              color: "white",
            }}
            onClick={() => {
              navigate("/posts");
            }}
          >
            <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </>
      )}
    </>
  );
}
