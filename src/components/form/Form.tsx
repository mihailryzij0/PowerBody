import { useState} from 'react'
import React from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
const CustomizedBox = styled(Box)`
display: flex;
flex-direction: column;
margin-top: 30%;
text-align: center;
`;

interface FormProps {
  title:string;
  handleClick: ( email:string, pass: string )=> void
}
export function Form ({handleClick, title}:FormProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return(

    <CustomizedBox  >
      <Typography variant='h2' >{title}</Typography>
    <TextField value={pass}
     onChange={(e) => setPass(e.target.value)}
      type='password'
       label="password"
       sx={{mt:'30px'}}
        variant="outlined" />
    <TextField value={email} 
    onChange={(e) => setEmail(e.target.value)}  
    type='email' 
    sx={{mt:'30px'}}
    label="email" 
    variant="outlined" />
    <Button onClick={()=>handleClick(email,pass)} sx={{mt:'30px'}} variant="contained">Contained</Button>
    </CustomizedBox>
  )
}
