import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Post } from "../../store/slices/types";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import ProfileTopInfo from "./ProfileTopInfo";
import ProfileWorkouts from "./ProfileWorkouts";

export default function ProfileContent() {
  const MyBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    text-align: center;
  `;

  const { workout, avatarImg } = useAppSelector((state) => state.userData);
  return workout ? (
    <>
      <div className="container">
        <ProfileTopInfo image={avatarImg} />
      </div>
      <ProfileWorkouts workout={workout as Required<Post>} />
      <div className="profile-vidio container">
        <YoutubeEmbed linkYouTubeVidio={workout.vidio} />
      </div>
    </>
  ) : (
    <Typography>Здесб будет ваша тренировка</Typography>
  );
}
