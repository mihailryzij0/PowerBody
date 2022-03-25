import {
  Box,
  Button,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/header/Header";
import SelectGroup from "../components/SelectGroup/SelectGroup";

export interface SelectGroupState {
  level: string;
  difficult: string;
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
      items: ["Начинающий", "Средний", "Выше среднего"],
    },
    {
      criteria: "difficult",
      placeholder: "Желаемая сложность",
      items: [
        "Тренировки средней тяжести",
        "Тренировки полегче",
        "Тренировки посложнее",
      ],
    },
    {
      criteria: "purpose",
      placeholder: "Цель тренировок",
      items: [
        "Похудеть",
        "Набрать массу",
        "Повысить силовые",
        "Повысить выносливость",
      ],
    },
    {
      criteria: "muscleGroup",
      placeholder: "Чему уделить внимание",
      items: ["Ноги", "Спина", "Пресс", "Грудь"],
    },
  ];

  const [criteria, setСriteria] = useState<SelectGroupState>({
    level: "",
    difficult: "",
    purpose: "",
    muscleGroup: "",
  });

  return (
    <Container maxWidth={"sm"}>
      <Box sx={{  display:'flex', flexDirection: 'column'}}  mt={"200px"}>
        <SelectGroup
          state={criteria}
          onCriteriaChange={setСriteria}
          selectGrupItems={selectGrupItems}
        />
        <Button sx={{mt:'40px'}} variant="contained">Создать тренировку</Button>
      </Box>

      <Header></Header>
    </Container>
  );
}
