import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFirebaseData } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getUserAvatar } from "../../store/slices/getUsersAvatarSlice";

interface Props {
  authorId: string | null;
}

export default function AvatarDinamic({ authorId }: Props) {
  const [avatar, setAvatar] = useState("");
  const { usersAvatar } = useAppSelector((state) => state.usersAvatar);
  const dispach = useAppDispatch();
  useEffect(() => {
    const avatar = usersAvatar.find((item) => item.userId === authorId);
    avatar ? setAvatar(avatar.avatarImage) : dispach(getUserAvatar(authorId));
  }, []);
  return <Avatar alt="avatar" src={avatar} />;
}
