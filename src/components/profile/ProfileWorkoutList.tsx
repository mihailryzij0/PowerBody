import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import WorkoutListItem from "../Post/WorkoutListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  deleteWorkout,
  updateUserWorkout,
} from "../../store/slices/userWorkoutSlice";
import { Post } from "../../store/slices/cardsSlice";

export default function ProfileWorkoutList({ workout }: Record<string, Post>) {
  const { workouts } = workout;
  const dispatch = useAppDispatch();
  const hendleClick = (index: number) => {
    dispatch(deleteWorkout(index));
    dispatch(updateUserWorkout());
  };
  return (
    <>
      {workouts.map((el, index) => (
        <Accordion key={index}>
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
              <IconButton
                aria-label="delete"
                sx={{ mr: "20px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  hendleClick(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
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
