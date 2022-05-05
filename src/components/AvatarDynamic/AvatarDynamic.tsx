import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getUserAvatar } from "../../store/slices/getUsersAvatarSlice";

interface Props {
  authorId: string | null;
}

export default function AvatarDynamic({ authorId }: Props) {
  const { usersAvatar } = useAppSelector((state) => state.usersAvatar);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!usersAvatar.authorId && authorId) {
      dispatch(getUserAvatar(authorId));
    }
  }, []);
  return (
    <Avatar
      alt="avatar"
      sx={{ transformTranslateZ: "0", marginRight: "10px" }}
      src={authorId && usersAvatar[authorId] ? usersAvatar[authorId] : ""}
    />
  );
}
