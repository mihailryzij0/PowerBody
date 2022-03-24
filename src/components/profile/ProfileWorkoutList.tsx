import React, { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  List,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import WorkoutListItem from "../Post/WorkoutListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  setUpdateWorkout,
  updateWorkout,
} from "../../store/slices/userWorkoutSlice";
import { Post, Workout } from "../../store/slices/cardsSlice";
export default function ProfileWorkoutList({ workout }: Record<string, Post>) {
  const { workouts } = workout;
  const dispatch = useAppDispatch();
  const hendleClick = (index: number) => {
    dispatch(updateWorkout(index));
    dispatch(setUpdateWorkout());
  };
  return (
    <>
      {workouts.map((el, i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography>{el.workoutName}</Typography>
              <Button
                sx={{ mr: "40px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  hendleClick(i);
                }}
              >
                rgdg
              </Button>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <WorkoutListItem exercises={el.exercises} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
