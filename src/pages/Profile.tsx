import { Backdrop, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileTopInfo from "../components/profile/ProfileTopInfo";
import ProfileWorkouts from "../components/profile/ProfileWorkouts";
import YoutubeEmbed from "../components/YoutubeEmbed/YoutubeEmbed";
import { Post } from "../store/slices/types";

export default function Profile() {
  const { userData } = useAppSelector((state) => state);
  return (
    <>
      {userData.status == "getData-pending" ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : userData.workout ? (
        <>
          <div className="container">
            <ProfileTopInfo image={userData.avatarImg} />
          </div>
          <ProfileWorkouts workout={userData.workout as Required<Post>} />
          <div className="profile-vidio container">
            <YoutubeEmbed linkYouTubeVidio={userData.workout.vidio} />
          </div>
        </>
      ) : (
        <Typography>Здесб будет ваша тренировка</Typography>
      )}
    </>
  );
}
