import { Box, Typography, Rating, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { getPostCards } from "../../store/slices/cardsSlice";
import { Post, Workout } from "../../store/slices/types";
import {
  updateUserData,
  updateUserWorkout,
} from "../../store/slices/userDataSlice";
import AvatarDinamic from "../AvatarDynamic/AvatarDinamic";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import FormCreateComment from "./FormCreateComent";
import PostComments from "./PostComments";
import WorkoutList from "./WorkoutList";

type postData = { postData: Post };

export default function PostContent({ postData }: postData) {
  const {
    title,
    description,
    workouts,
    rating,
    image,
    vidio,
    authorId,
    author,
    comments,
    id,
  } = postData;
  const previwWorkot: Workout[] | undefined = workouts?.slice(0, 3);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [successButton, setSuccessButton] = useState(false);

  const handleClick = () => {
    if (successButton) {
      navigate("/");
    } else {
      dispatch(updateUserWorkout(postData));
      dispatch(updateUserData());
      setSuccessButton(true);
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
      <div className="post-baner">
        <img className="post-baner__img" src={image} />
        <div className="post-baner__footer">
          <AvatarDinamic authorId={authorId} />
          <Typography variant="body1" align="center">
            {author}
          </Typography>
        </div>
      </div>
      <div className="container">
        <Typography mt={2} variant="h4" align="center">
          {title}
        </Typography>
        <Typography mt={2} mb={2} variant="body2" align="center">
          {description}
        </Typography>
        <div className="post-rating">
          <Rating
            name="size-large"
            disabled={true}
            defaultValue={Number(rating)}
          />
        </div>
        <YoutubeEmbed linkYouTubeVidio={vidio} />
        {previwWorkot && (
          <>
            <Box sx={{ mt: "50px" }}>
              <WorkoutList workouts={previwWorkot} />
            </Box>
            <Box sx={{ m: "0 auto", width: "max-content" }}>
              <MyButton />
            </Box>
          </>
        )}
        <div className="feedback-box">
          <Typography textAlign={"center"} variant="h4">
            {" "}
            Оставь комментарий о тренировке{" "}
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
