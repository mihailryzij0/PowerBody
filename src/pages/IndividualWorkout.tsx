import { Box, Button, Container } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/header/Header";
import SelectGroup from "../components/SelectGroup/SelectGroup";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Post } from "../store/slices/cardsSlice";
import { setUserWorkout, userWorkout } from "../store/slices/userWorkoutSlice";
import { trainingCreator } from "../trainingCreator/trainingCreator";

export interface SelectGroupState {
  level: string;
  purpose: string;
  muscleGroup: string;
}

export interface SelectGrupItems {
  criteria: keyof SelectGroupState;
  placeholder: string;
  items: Array<string>;
}
export default function IndividualWorkout() {
  const selectGrupItems: SelectGrupItems[] = [
    {
      criteria: "level",
      placeholder: "Уровень подготовки",
      items: ["Начинающий", "Средний"],
    },
    {
      criteria: "purpose",
      placeholder: "Цель тренировок",
      items: ["Набрать массу", "Повысить силовые", "Повысить выносливость"],
    },
    {
      criteria: "muscleGroup",
      placeholder: "Чему уделить внимание",
      items: ["Ноги", "Спина", "Грудь"],
    },
  ];

  const [criteria, setСriteria] = useState<SelectGroupState>({
    level: "",
    purpose: "",
    muscleGroup: "",
  });
  const dispatch = useAppDispatch();
  const { idUser } = useAppSelector((state) => state.user);
  const hendleClick = () => {
    const workout = trainingCreator(criteria) as Post;
    dispatch(setUserWorkout({ workout, idUser }));
    trainingCreator(criteria);
  };

  return (
    <Container maxWidth={"sm"}>
      <Box sx={{ display: "flex", flexDirection: "column" }} mt={"200px"}>
        <SelectGroup
          state={criteria}
          onCriteriaChange={setСriteria}
          selectGrupItems={selectGrupItems}
        />
        <Button onClick={hendleClick} sx={{ mt: "40px" }} variant="contained">
          Создать тренировку
        </Button>
      </Box>

      <Header></Header>
    </Container>
  );
}
