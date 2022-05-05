import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkoutListItem from "../WorkoutListItem.tsx/WorkoutListItem";
import { Post, Workout } from "../../store/slices/types";

export default function WorkoutList({ workouts }: Pick<Post, "workouts">) {
  const previewWorkout: Workout[] | undefined = workouts?.slice(0, 3);

  return (
    <>
      {previewWorkout?.map((workout, i) => (
        <Accordion sx={{ marginBottom: "10px", width: "100%" }} key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{`${i + 1} День - ${workout.workoutName}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WorkoutListItem exercises={workout.exercises} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
