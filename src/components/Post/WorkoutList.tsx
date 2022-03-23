import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkoutListItem from "./WorkoutListItem";
import { Post, Workout } from "../../store/slices/cardsSlice";

export default function WorkoutList({ workouts }: Pick<Post, "workouts">) {
  return (
    <>
      {workouts.map((workout, i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{workout.workoutName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WorkoutListItem exercises={workout.exercises} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
