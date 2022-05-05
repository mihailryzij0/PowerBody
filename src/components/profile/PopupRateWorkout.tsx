import {
  Dialog,
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
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
      open={true}
      onClose={closePopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "30px" }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            data-testid={"closeButton"}
            edge="start"
            color="inherit"
            onClick={() => closePopup(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="popup-content-box">
        <Typography textAlign={"center"} mb={2} variant="h4">
          Оцени тренировку
        </Typography>
        <RatingDynamic id={id} handleChange={changeRating} />
      </div>
    </Dialog>
  );
}
