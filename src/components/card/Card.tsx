import { ImageListItem, ImageListItemBar, Rating } from "@mui/material";
import React from "react";
import { CardImg } from "./card.style";

export interface CardProps {
  title: string;
  rating: string;
  image: string | null;
}
export default function Card({ title, rating, image }: CardProps) {
  return (
    <ImageListItem sx={{ mt: "20px", mb: "20px" }}>
      <CardImg src={image ? image : ""}></CardImg>
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
