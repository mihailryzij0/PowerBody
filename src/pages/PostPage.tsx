import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/NavPanel/NavPanel";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getPostData } from "../store/slices/postSlice";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Box, CircularProgress, IconButton } from "@mui/material";
import PostContent from "../components/Post/PostContent";

export default function PostPage() {
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPostData(id));
  }, []);
  const navigate = useNavigate();
  const { post } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { postData, status, error } = post;

  return (
    <>
      {status === "pending" || postData === null ? (
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <PostContent postData={postData} />
      )}
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
  );
}
