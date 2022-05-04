import { Rating } from "@mui/material";
import React, { SyntheticEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getRating } from "../../store/slices/ratingSlice";

interface RatingDinamicProps {
  id: string;
  disabled?: boolean;
  handleChange?: (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
}

export default function RatingDinamic({
  id,
  disabled,
  handleChange,
}: RatingDinamicProps) {
  const { ratings } = useAppSelector((state) => state.ratings);
  const dispach = useAppDispatch();
  useEffect(() => {
    if (ratings && !ratings[id] && id) {
      dispach(getRating(id));
    }
  }, []);
  return (
    <Rating
      value={ratings[id] ? ratings[id].rating : 0}
      size="large"
      name="size-large"
      disabled={disabled}
      defaultValue={5}
      onChange={handleChange}
    />
  );
}
