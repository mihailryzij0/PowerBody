import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { filterCards } from "../../store/slices/cardsSlice";
import { Card } from "../../store/slices/types";

export default function CardsFilter() {
  const dispatch = useAppDispatch();
  const {
    postCards,
    filteredCards: { filteredParams: filteredParams },
  } = useAppSelector((state) => state.cards);
  const [authors, setAuthors] = useState<Array<string> | []>([]);

  useEffect(() => {
    let newListAuthors: Array<string> = [];
    for (let value of Object.values(postCards)) {
      value.forEach((element: Card) => {
        newListAuthors.push(element.author);
      });
    }
    setAuthors(Array.from(new Set(newListAuthors)));
  }, [postCards]);

  const handleChangeWorkoutType = (param: SelectChangeEvent) => {
    dispatch(
      filterCards({ ...filteredParams, typeWorkout: param.target.value })
    );
  };
  const handleChangeAuthors = (param: SelectChangeEvent) => {
    dispatch(filterCards({ ...filteredParams, author: param.target.value }));
  };
  return (
    <div className="cards-filter">
      <FormControl className="cards-filter__item" fullWidth={true}>
        <Select
          inputProps={{ "data-testid": "select-1" }}
          fullWidth={true}
          value={filteredParams.typeWorkout}
          onChange={handleChangeWorkoutType}
        >
          <MenuItem value={"Стандарт"}>Стандарт</MenuItem>
          <MenuItem value={"На массу"}>На массу</MenuItem>
          <MenuItem value={"На сушку"}>На сушку</MenuItem>
          <MenuItem value={"На выносливость"}>На выносливость</MenuItem>
          <MenuItem value={"Весь список"}>Весь список</MenuItem>
        </Select>
        <FormHelperText>Тип тренировки</FormHelperText>
      </FormControl>
      <FormControl className="cards-filter__item" fullWidth={true}>
        <Select
          data-testid="select-2"
          fullWidth={true}
          value={filteredParams.author}
          onChange={handleChangeAuthors}
        >
          <MenuItem value={"Весь список"}>Весь список</MenuItem>
          {authors.map((author, index) => (
            <MenuItem key={index} value={author}>
              {author}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Автор</FormHelperText>
      </FormControl>
    </div>
  );
}
