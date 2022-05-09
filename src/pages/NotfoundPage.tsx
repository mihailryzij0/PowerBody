import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function NotfoundPage() {
  return (
    <Typography variant="h4" textAlign={"center"}>
      Страница не существует, пройдите на страницу <Link to="/">профиля</Link>
    </Typography>
  );
}
