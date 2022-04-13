import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  IconButton,
  Fab,
} from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Exercises } from "../../trainingCreator/trainingCreator";

export default function InputGrupWorkout() {
  const { register, getValues, control } = useFormContext();

  const { fields, update, append } = useFieldArray({
    control,
    name: "workouts",
  });

  const deleteLastTextField = (index: number) => {
    const { workouts } = getValues();
    const workout = workouts[index];
    const exercisesIndexLastItem = workout.exercises.length - 1;
    workout.exercises.splice(exercisesIndexLastItem, 1);
    update(index, workout);
  };

  const addTextField = (index: number) => {
    const { workouts } = getValues();
    const workout = workouts[index];
    workout.exercises.push("");
    update(index, workout);
  };

  type TypeField = [
    {
      workotName: string;
      exercises: Array<string>;
    }
  ];

  const typeFilds = fields as unknown as TypeField;

  return (
    <div className="form-workout-box">
      {typeFilds.map((inputsBlock, indexBlock) => (
        <Accordion sx={{ marginBottom: "10px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Тренировочный день / {indexBlock + 1} </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth={true}
              label="Название комплекса"
              margin="normal"
              variant="outlined"
              {...register(`workouts.${indexBlock}.workoutName`, {
                required: "поле обьзательо для заполнения",
              })}
            />
            {inputsBlock.exercises.map((input, index: number) => (
              <TextField
                fullWidth={true}
                label="Упражнение"
                margin="normal"
                variant="outlined"
                {...register(`workouts.${indexBlock}.exercises.${index}`, {
                  required: "поле обьзательо для заполнения",
                })}
              />
            ))}
            <IconButton
              onClick={() => addTextField(indexBlock)}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </IconButton>
            <IconButton
              disabled={inputsBlock.exercises.length < 2}
              onClick={() => deleteLastTextField(indexBlock)}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionDetails>
        </Accordion>
      ))}
      <Fab
        color="secondary"
        onClick={() => {
          append({
            exercises: [""],
            workoutName: "",
          });
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
