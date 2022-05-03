import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { comment } from "../../store/slices/types";
import AvatarDinamic from "../AvatarDynamic/AvatarDinamic";

export default function PostComments({
  comments,
}: Record<string, Array<comment>>) {
  return (
    <>
      {comments.map((comment, index) => (
        <div key={index} className="comments-list__coment comment">
          <div className="comment__info">
            <AvatarDinamic authorId={comment.authorCommentId} />
            <Typography variant="body2">{comment.authorCommentName}</Typography>
          </div>
          <Typography mt={2} className="comment__text" variant="body1">
            {comment.commentText}
          </Typography>
        </div>
      ))}
    </>
  );
}
