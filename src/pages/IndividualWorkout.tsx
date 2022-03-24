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
      </Box>

      <Header></Header>
    </Container>
  );
}
