import { Rating } from "@mui/material";
import React, { SyntheticEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getRating } from "../../store/slices/ratingSlice";

interface RatingDynamicProps {
  id: string;
  disabled?: boolean;
  handleChange?: (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
}

export default function RatingDynamic({
  id,
  disabled,
  handleChange,
}: RatingDynamicProps) {
  const { ratings } = useAppSelector((state) => state.ratings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (ratings && !ratings[id] && id) {
      dispatch(getRating(id));
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
