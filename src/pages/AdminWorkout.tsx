import { Box, Button, Container, styled, TextareaAutosize, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function AdminWorkout() {
    const [post, setPost] = useState();
    const [workoutPostChoice, setChoice] = useState('course'); 
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newChoice: string,
    ) => {
      setChoice(newChoice);
    };
    const MyBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    text-align: center;
  `;
  return (
    <Container sx={{textAlign: 'center'}} >
<MyBox>
   <ToggleButtonGroup
  color="primary"
  value={workoutPostChoice}
  exclusive
  onChange={handleChange}
>
  <ToggleButton value="workout">Тренировка</ToggleButton>
  <ToggleButton value="course">Курс</ToggleButton>
  </ToggleButtonGroup>
  <TextareaAutosize
  aria-label="minimum height"
  placeholder="Введите описание"
  style={{ minWidth: '100%', minHeight:'200px', marginTop:'40px'  }}
/>
<Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button>
{workoutPostChoice === 'workout'? 

          <><Box>
            <Typography variant='h4'>Первый день</Typography>
            <TextField fullWidth label="fullWidth" id="fullWidth" />
            <TextField fullWidth label="fullWidth" id="fullWidth" />
            <TextField fullWidth label="fullWidth" id="fullWidth" />
            <TextField fullWidth label="fullWidth" id="fullWidth" />
            <TextField fullWidth label="fullWidth" id="fullWidth" />
            <TextField fullWidth label="fullWidth" id="fullWidth" />
          </Box><Box>
              <Typography variant='h4'>Второй день</Typography>
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
            </Box><Box>
              <Typography variant='h4'>Третий день</Typography>
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
              <TextField fullWidth label="fullWidth" id="fullWidth" />
            </Box></>
:
''
}
</MyBox>
    
    </Container>
  )
}
