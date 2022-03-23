import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
} from "@mui/material";
import React from "react";

export default function PostItem({ postData }: any) {
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
