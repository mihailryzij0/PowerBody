import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Rating,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { removeUser } from "../../store/slices/userSlice";
import ProfileWorkoutList from "./ProfileWorkoutList";

export default function ProfileContent() {
  const MyBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    text-align: center;
  `;
  const ProfileText = styled(Typography)`
    margin-top: 20px;
    margin-bottom: 20px;
  `;
  const dicpatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dicpatch(removeUser());
    navigate("/");
  };

  const { workout } = useAppSelector((state) => state.userWorkout);
  return workout ? (
    <Box>
      <Button sx={{ left: "80%", top: "5%" }} variant="outlined">
        Выйти
      </Button>
      <MyBox>
        <ProfileText variant="h4">{workout.title}</ProfileText>
        <Rating name="size-medium" defaultValue={Number(workout.rating)} />
        <ProfileText>{workout.description}</ProfileText>
      </MyBox>
      <ProfileWorkoutList workout={workout}></ProfileWorkoutList>
    </Box>
  ) : (
    <Typography>Здесб будет ваша тренировка</Typography>
  );
}
