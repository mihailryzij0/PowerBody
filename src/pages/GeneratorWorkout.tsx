import { Button, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutList from "../components/Post/WorkoutList";
import RatingDynamic from "../components/RatingDynamic/RatingDynamic";
import SelectGroup from "../components/SelectGroup/SelectGroup";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setRating } from "../store/slices/ratingSlice";
import { Post } from "../store/slices/types";

import {
  updateUserData,
  updateUserWorkout,
} from "../store/slices/userDataSlice";
import { trainingCreator } from "../trainingCreator/trainingCreator";

export interface SelectGroupState {
  level: string;
  purpose: string;
  muscleGroup: string;
}

export interface SelectGroupItems {
  criteria: keyof SelectGroupState;
  placeholder: string;
  items: Array<string>;
}
export default function GeneratorWorkout() {
  const selectGroupItems: SelectGroupItems[] = [
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

  const [criteria, setCriteria] = useState<SelectGroupState>({
    level: "",
    purpose: "",
    muscleGroup: "",
  });
  const [error, setError] = useState(false);
  const [workout, setWorkout] = useState<null | Post>(null);
  const ID_GENERATOR_WORKOUT = "1";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickGeneratingButton = () => {
    if (
      criteria.level !== "" &&
      criteria.purpose !== "" &&
      criteria.muscleGroup !== ""
    ) {
      setError(false);
      const createdTraining = trainingCreator(criteria) as Post;
      setWorkout(createdTraining);
    } else {
      setError(true);
    }
  };

  const handleClickAddButton = () => {
    dispatch(updateUserWorkout(workout));
    dispatch(updateUserData());
    navigate("/");
  };

  const changeRating = (
    event: SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (newValue) {
      dispatch(setRating({ newValue, id: ID_GENERATOR_WORKOUT }));
    }
  };

  return (
    <div className="container generator-workout">
      <div className="generator-workout__box">
        <Typography mt={1} variant="h3">
          Генератор тренировок
        </Typography>
        <Typography maxWidth={"440px"} textAlign={"center"} mt={1}>
          Тренировка рассчитывается для спортсменов начального и среднего
          уровня.
        </Typography>
        <RatingDynamic id={ID_GENERATOR_WORKOUT} handleChange={changeRating} />
        {!workout ? (
          <>
            <SelectGroup
              state={criteria}
              onCriteriaChange={setCriteria}
              selectGroupItems={selectGroupItems}
              error={error}
            />
            <Button
              onClick={handleClickGeneratingButton}
              sx={{ mt: "30px" }}
              variant="contained"
            >
              Создать тренировку
            </Button>
          </>
        ) : (
          <div
            data-testid="preview-workout"
            className="generator-workout__preview"
          >
            <WorkoutList workouts={workout.workouts} />
            <div className="generator-workout__buttons">
              <Button
                className="generator-workout__button"
                onClick={() => setWorkout(null)}
                variant="contained"
                color="secondary"
              >
                Назад
              </Button>
              <Button
                className="generator-workout__button"
                onClick={handleClickAddButton}
                variant="contained"
                color="success"
              >
                Добавить
              </Button>
            </div>
          </div>
        )}
        {error && (
          <Typography sx={{ color: "red" }}>Заполните все формы</Typography>
        )}
      </div>
      <Typography variant="body2" textAlign={"center"} mt={1}>
        На основе выбранных критериев происходит создание уникальной тренировки
        с поддержкой периодизации на протяжении всего комплекса, количество
        подходов и повторений тоже рассчитывается динамически
      </Typography>
    </div>
  );
}
