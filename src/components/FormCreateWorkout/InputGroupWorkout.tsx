import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  IconButton,
  Fab,
  Button,
} from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function InputGroupWorkout() {
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
      workoutName: string;
      exercises: Array<string>;
    }
  ];

  const typeFields = fields as unknown as TypeField;

  return (
    <div className="form-workout-box">
      {typeFields.map((inputsBlock, indexBlock) => (
        <Accordion key={indexBlock} sx={{ marginBottom: "10px" }}>
          <AccordionSummary
            data-testid={"accordionBtn"}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Тренировочный день / {indexBlock + 1} </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              inputProps={{ "data-testid": "inputNameComplex" }}
              fullWidth={true}
              label="Название комплекса"
              margin="normal"
              variant="outlined"
              {...register(`workouts.${indexBlock}.workoutName`, {
                required: "поле обязательно для заполнения",
              })}
            />
            {inputsBlock.exercises.map((input, index: number) => (
              <TextField
                inputProps={{ "data-testid": "inputNameExercise" }}
                fullWidth={true}
                key={index}
                label="Упражнение"
                margin="normal"
                variant="outlined"
                {...register(`workouts.${indexBlock}.exercises.${index}`, {
                  required: "поле обязательно для заполнения",
                })}
              />
            ))}
            <IconButton
              onClick={() => addTextField(indexBlock)}
              color="primary"
              aria-label="add"
              data-testid={"addExerciseInputBtn"}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              data-testid={"deleteExerciseInputBtn"}
              disabled={inputsBlock.exercises.length < 2}
              onClick={() => deleteLastTextField(indexBlock)}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="form-workout__bottom">
        <Fab
          data-testid={"addInputNameComplexBtn"}
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
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          data-testid={"buttonSubmit"}
        >
          Создать
        </Button>
      </div>
    </div>
  );
}
