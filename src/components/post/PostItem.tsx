import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

export default function PostItem({ postData }: any) {
  const posts = useSelector((state) => state);
  return (
    <ImageList cols={1} rowHeight={164}>
      <ImageListItem sx={{ borderRadius: "15px" }}>
        <img
          style={{ height: "100%", maxWidth: "100%" }}
          src={require("../../assets/fon.jpg")}
        ></img>
        <ImageListItemBar
          title={postData.title}
          actionIcon={
            <Rating
              name="size-medium"
              disabled={true}
              defaultValue={Number(postData.rating)}
            />
          }
        ></ImageListItemBar>
      </ImageListItem>
    </ImageList>
  );
}
