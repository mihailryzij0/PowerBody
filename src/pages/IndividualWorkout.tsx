import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/header/Header";

export default function IndividualWorkout() {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <Container>
      <Box mt={'200px'}>
        <FormControl>
          <Select
           sx={{width:'360px'}}
           value={age}
           onChange={handleChange}
           displayEmpty
           inputProps={{ 'aria-label': 'Without label' }}
          >
           <MenuItem value="">
            <em>Уровень подготовки</em>
          </MenuItem>
          <MenuItem value={10}>Начинающий</MenuItem>
          <MenuItem value={21}>Средний</MenuItem>
          <MenuItem value={22}>Выше среднего</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
           sx={{width:'360px'}}
           value={age}
           onChange={handleChange}
           displayEmpty
           inputProps={{ 'aria-label': 'Without label' }}
          >
           <MenuItem value="">
            <em>Желаемая сложность</em>
          </MenuItem>
          <MenuItem value={10}>Тренировки средней тяжести</MenuItem>
          <MenuItem value={21}>Тренировки полегче</MenuItem>
          <MenuItem value={22}>Тренировки посложнее</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
           sx={{width:'360px'}}
           value={age}
           onChange={handleChange}
           displayEmpty
           inputProps={{ 'aria-label': 'Without label' }}
          >
           <MenuItem value="">
            <em>Цель тренировок</em>
          </MenuItem>
          <MenuItem value={10}>Похудеть</MenuItem>
          <MenuItem value={21}>Набрать массу</MenuItem>
          <MenuItem value={22}>Повысить силовые</MenuItem>
          <MenuItem value={22}>Повысить выносливость</MenuItem>
          </Select>
        </FormControl>
        <FormControl >
          <Select
           sx={{width:'360px'}}
           value={age}
           onChange={handleChange}
           displayEmpty
           inputProps={{ 'aria-label': 'Without label' }}
          >
           <MenuItem value="">
            <em>Чему уделить внимание</em>
          </MenuItem>
          <MenuItem value={10}>Ноги</MenuItem>
          <MenuItem value={21}>Спина</MenuItem>
          <MenuItem value={22}>Пресс</MenuItem>
          <MenuItem value={22}>Грудь</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Header></Header>
    </Container>
  );
}
