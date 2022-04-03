import {
  Box,
  Container,
  IconButton,
  styled,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputArray from "../components/form/InputArray";
import Header from "../components/header/Header";

export default function AdminWorkout() {
  const [postKey, setPostKey] = useState("vitamins");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: string
  ) => {
    setPostKey(newChoice);
  };
  const MyBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    text-align: center;
  `;
  const navigate = useNavigate();

  return (
    <Container maxWidth={"sm"} sx={{ textAlign: "center" }}>
      <MyBox>
        <ToggleButtonGroup
          color="primary"
          value={postKey}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="workouts">Тренировка</ToggleButton>
          <ToggleButton value="vitamins">Курс</ToggleButton>
        </ToggleButtonGroup>
        {/* <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button> */}
        <InputArray postKey={postKey} />
      </MyBox>
      <IconButton
        sx={{
          position: "fixed",
          top: "20px",
          left: "10px",
          color: "black",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Header></Header>
    </Container>
  );
}
