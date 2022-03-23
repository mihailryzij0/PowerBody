import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import WorkoutListItem from "../Post/WorkoutListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function ProfileWorkoutList({ workout }) {
  const { workouts } = workout;
  console.log(workouts);
  return (
    <>
      {workouts.map((el, i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{el.workoutName}</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
