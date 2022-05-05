import { Typography } from "@mui/material";
import React from "react";
import { comment } from "../../store/slices/types";
import AvatarDynamic from "../AvatarDynamic/AvatarDynamic";

export default function PostComments({
  comments,
}: Record<string, Array<comment>>) {
  return (
    <>
      {comments.map((comment, index) => (
        <div key={index} className="comments-list__comment comment">
          <div className="comment__info">
            <AvatarDynamic authorId={comment.authorCommentId} />
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
