import { ImageListItem, ImageListItemBar, Skeleton } from "@mui/material";
import React from "react";
import { CardImg } from "./card.style";
import AvatarDynamic from "../AvatarDynamic/AvatarDynamic";
import RatingDynamic from "../RatingDynamic/RatingDynamic";
export interface CardProps {
  title: string;
  image: string;
  author: string;
  authorId: string | null;
  id: string;
}

export default function Card({
  title,
  image,
  author,
  authorId,
  id,
}: CardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  return (
    <ImageListItem
      sx={{ borderRadius: "20px", overflow: "hidden", mt: 2, mb: 2 }}
    >
      <CardImg
        aria-label="image-card"
        alt="card"
        src={image ? image : ""}
        className={`smooth-image image-${imageLoaded ? "visible" : "hidden"}`}
        onLoad={() => setImageLoaded(true)}
      ></CardImg>
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          sx={{ position: "absolute" }}
        />
      )}
      <ImageListItemBar
        title={title}
        actionIcon={<RatingDynamic id={id} disabled={true} />}
      ></ImageListItemBar>
      <ImageListItemBar
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
          paddingLeft: "10px",
        }}
        position="top"
        title={author}
        actionPosition="left"
        actionIcon={<AvatarDynamic authorId={authorId} />}
      ></ImageListItemBar>
    </ImageListItem>
  );
}
