import { Dialog, AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RatingDynamic from "../RatingDynamic/RatingDynamic";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setRating } from "../../store/slices/ratingSlice";
interface PopupRateWorkout {
  closePopup: Dispatch<SetStateAction<boolean>>;
  id: string;
}

export default function PopupRateWorkout({ closePopup, id }: PopupRateWorkout) {
  const dispatch = useAppDispatch();

  const changeRating = (
    event: SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (newValue) {
      dispatch(setRating({ newValue, id }));
      closePopup(true);
    }
  };
  return (
    <Dialog
      className="profile-popup"
      open={true}
      onClose={closePopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "30px" }}
    >
      <div className="profile-popup__content">
        <Typography textAlign={"center"} mb={2} variant="h4">
          Оцени тренировку
        </Typography>
        <RatingDynamic id={id} handleChange={changeRating} />
      </div>
    </Dialog>
  );
}
