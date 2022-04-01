import { Box, Button, Container, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [helperText, setHelperText] = useState(false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { idUser } = useAppSelector((state) => state.user);

  const hendleClick = () => {
    if(criteria.level !== "" &&
       criteria.purpose !== "" &&
       criteria.muscleGroup !== "" ){
      setHelperText(false)
      const workout = trainingCreator(criteria) as Post;
      dispatch(setUserWorkout({ workout, idUser }));
      navigate('/')
    }else{
      setHelperText(true)
    }


  };
  const MyBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  text-align: center;
`;

  return (
    <Container maxWidth={"sm"}>
      <MyBox mt={"200px"}>
        <Typography mt={1} variant="h3" >Генератор тренировок</Typography>
         <Typography mt={1}>Тренировка расчитывается для спорсменов начального и среднего уровня</Typography>
        <SelectGroup
          state={criteria}
          onCriteriaChange={setСriteria}
          selectGrupItems={selectGrupItems}
        />
        <Button onClick={hendleClick} sx={{ mt: "40px" }} variant="contained">
          Создать тренировку
        </Button>
         {helperText? <Typography sx={{color:'red'}} >Заполните все формы</Typography>: '' }
      </MyBox>

      <Header></Header>
    </Container>
  );
}
