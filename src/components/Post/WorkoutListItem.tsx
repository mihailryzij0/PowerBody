import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Workout } from "../../store/slices/cardsSlice";

export default function WorkoutListItem({
  exercises,
}: Omit<Workout, "workoutName">) {
  return (
    <List>
      {exercises.map((ei, i) => (
        <ListItem key={i}>
          <ListItemText primary={`${i + 1}- ${ei}`} />
        </ListItem>
      ))}
    </List>
  );
}
