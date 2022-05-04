import { TextField, Button } from "@mui/material";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks";
import { setComments, updateComments } from "../../store/slices/postSlice";
import { comment } from "../../store/slices/types";

interface FormCreateComment {
  postId: string;
}

export default function FormCreateComment({ postId }: FormCreateComment) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { userData, post, user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      const comment: comment = {
        commentText: message,
        authorCommentId: user.idUser as string,
        authorCommentName: userData.nickname,
      };
      dispatch(setComments(comment));
      dispatch(updateComments(postId));
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form className="feedback-box__form" onSubmit={handleSubmit}>
      <TextField
        multiline
        fullWidth
        error={error}
        value={message}
        label="Комментарий"
        onChange={handleChange}
      />
      <Button type="submit">Отправить</Button>
    </form>
  );
}
