import { Box, Typography, Button, Skeleton } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setRating } from "../../store/slices/ratingSlice";
import { Post } from "../../store/slices/types";
import {
  updateUserData,
  updateUserWorkout,
} from "../../store/slices/userDataSlice";
import AvatarDynamic from "../AvatarDynamic/AvatarDynamic";
import RatingDynamic from "../RatingDynamic/RatingDynamic";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import FormCreateComment from "./FormCreateComment";
import PostComments from "./PostComments";
import WorkoutList from "./WorkoutList";

type postData = { postData: Post };

export default function PostContent({ postData }: postData) {
  const {
    title,
    description,
    workouts,
    image,
    video: video,
    authorId,
    author,
    comments,
    id,
  } = postData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [successButton, setSuccessButton] = useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const handleClick = () => {
    if (successButton) {
      navigate("/");
    } else {
      dispatch(updateUserWorkout(postData));
      dispatch(updateUserData());
      setSuccessButton(true);
    }
  };

  const changeRating = (
    event: SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (newValue) {
      dispatch(setRating({ newValue, id }));
    }
  };

  const MyButton = () => {
    return successButton ? (
      <Button color="success" variant="contained" onClick={handleClick}>
        {" "}
        Перейти в ЛК{" "}
      </Button>
    ) : (
      <Button color="primary" variant="contained" onClick={handleClick}>
        {" "}
        Добавить тренировку{" "}
      </Button>
    );
  };

  return (
    <>
      <div className="post__banner">
        <img
          src={image ? image : ""}
          className={`post__banner-img smooth-image image-${
            imageLoaded ? "visible" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"100%"}
            sx={{ position: "absolute", top: "0" }}
          />
        )}
      </div>
      <div className="container">
        <Typography mt={2} variant="h4" align="center">
          {title}
        </Typography>
        <Typography mt={2} mb={2} variant="body2" align="center">
          {description}
        </Typography>
        <div className="post__author">
          <AvatarDynamic authorId={authorId} />
          <Typography variant="body1" align="center">
            {author}
          </Typography>
        </div>
        <div className="post__rating">
          <RatingDynamic id={id} handleChange={changeRating} />
        </div>
        <YoutubeEmbed linkYouTubeVideo={video} />
        {workouts && (
          <>
            <Box sx={{ mt: "50px" }}>
              <WorkoutList workouts={workouts} />
            </Box>
            <Box sx={{ m: "0 auto", width: "max-content" }}>
              <MyButton />
            </Box>
          </>
        )}
        <div className="feedback-box">
          <Typography textAlign={"center"} variant="h4">
            {" "}
            Оставь комментарий{" "}
          </Typography>
          <div className="feedback-box__comments comments-list">
            <PostComments comments={comments} />
          </div>
          <FormCreateComment postId={id} />
        </div>
      </div>
    </>
  );
}
