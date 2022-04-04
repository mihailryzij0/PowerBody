import {
  ImageListItem,
  ImageListItemBar,
  Rating,
} from "@mui/material";
import React from "react";
import { CardImg } from "./card.style";

export interface CardProps{
  title:string;
  rating:string;

}
export default function Card( {title, rating} : CardProps) {
  return (
    <ImageListItem sx={{ mt: "20px", mb: "20px" }}>
      <CardImg
        src={require("../../assets/fon.jpg")}
      ></CardImg>
      <ImageListItemBar
        title={title}
        actionIcon={
          <Rating
            name="size-medium"
            disabled={true}
            defaultValue={Number(rating)}
          />
        }
      ></ImageListItemBar>
    </ImageListItem>
  );
}
