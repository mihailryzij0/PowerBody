import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { Post } from "../../store/slices/types";
import {
  deleteUserWorkout,
  updateUserData,
} from "../../store/slices/userDataSlice";
import AvatarDinamic from "../AvatarDynamic/AvatarDinamic";
import PopupRateWorkout from "./PopupRateWorkout";

export default function ProfileWorkouts({
  workout,
}: Record<string, Required<Post>>) {
  const { workouts } = workout;
  const [activeStep, setActiveStep] = React.useState(0);
  const [openPopup, setOpenPopup] = React.useState(false);
  const maxSteps = workouts.length;
  const theme = useTheme();

  const setStateOpen: Dispatch<SetStateAction<boolean>> = (open) => {
    if (workouts.length === 1) {
      dispatch(deleteUserWorkout(0));
      dispatch(updateUserData());
    }
    setOpenPopup(open);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const dispatch = useAppDispatch();
  const hendleClick = (index: number) => {
    if (workouts.length === 1) {
      setOpenPopup(true);
    } else {
      dispatch(deleteUserWorkout(index));
      dispatch(updateUserData());
    }
  };

  return (
    <div className="profile-workout">
      <div className="profile-workout__title"></div>
      <div>
        <Box sx={{ minWidth: "100%", flexGrow: 1 }}>
          <div className="profile-workout__header">
            <Typography>{workout.title}</Typography>
            <div className="profile-workout__header_right">
              <AvatarDinamic authorId={workout.authorId} />
              <Typography variant="subtitle1">{workout.author}</Typography>
            </div>
          </div>
          <div className="workout-box">
            <div className="workout-box__workout">
              <List className="workout-list">
                <ListItem>{workouts[activeStep]?.workoutName}</ListItem>
                {workouts[activeStep]?.exercises.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </List>
              <Button
                onClick={() => hendleClick(activeStep)}
                variant="outlined"
                sx={{
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  border: "1px solid #fff",
                  color: "#fff",
                }}
              >
                Пройдено
              </Button>
            </div>
          </div>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </div>
      {openPopup && (
        <PopupRateWorkout closePopup={setStateOpen} id={workout.id} />
      )}
    </div>
  );
}
