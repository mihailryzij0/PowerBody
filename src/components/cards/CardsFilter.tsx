import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { filterCards } from "../../store/slices/cardsSlice";
import { Card } from "../../store/slices/types";

export default function CardsFilter() {
  const dispatch = useAppDispatch();
  const {
    postCards,
    filteredCards: { filtredParams },
  } = useAppSelector((state) => state.cards);
  const [autors, setAutors] = useState<Array<string> | []>([]);

  useEffect(() => {
    let newListAutors: Array<string> = [];
    for (let value of Object.values(postCards)) {
      value.forEach((element: Card) => {
        newListAutors.push(element.author);
      });
    }
    setAutors(Array.from(new Set(newListAutors)));
  }, [postCards]);

  const handleChangeWorkoutType = (param: SelectChangeEvent) => {
    dispatch(
      filterCards({ ...filtredParams, typeWorkout: param.target.value })
    );
  };
  const handleChangeAotors = (param: SelectChangeEvent) => {
    dispatch(filterCards({ ...filtredParams, author: param.target.value }));
  };
  return (
    <div className="cards-filter">
      <Select
        className="cards-filter__item"
        fullWidth={true}
        value={filtredParams.typeWorkout}
        onChange={handleChangeWorkoutType}
      >
        <MenuItem value={"Стандарт"}>Стандарт</MenuItem>
        <MenuItem value={"На массу"}>На массу</MenuItem>
        <MenuItem value={"На сушку"}>На сушку</MenuItem>
        <MenuItem value={"На выносливость"}>На выносливость</MenuItem>
        <MenuItem value={"Весь список"}>Весь список</MenuItem>
      </Select>

      <Select
        className="cards-filter__item"
        fullWidth={true}
        value={filtredParams.author}
        onChange={handleChangeAotors}
      >
        <MenuItem value={"Весь список"}>Весь список</MenuItem>
        {autors.map((autor, index) => (
          <MenuItem key={index} value={autor}>
            {autor}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
