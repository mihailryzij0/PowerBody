import { AccountCircle, FitnessCenter, Home, PlaylistAdd} from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Menu, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const CustomizedSlide = styled(Menu)`
  color: #20b2aa;
  min-width: 100% !important
  max-width: 100%;
min-height: 16px;
max-height: calc(100% - 32px);
left:0;
outline: 0;
display:none
min-width: 100%;
  :hover {
    color: #2e8b57;
  }
`;

export default function Header() {
  let navigate = useNavigate();  
   async function goProfile() { 
    navigate('/Profile'); 
     } 
    //  async function goBack() { 
    //   navigate(-1); 
    //   } 
    async function goWorkoutProgram() { 
      navigate("/WorkoutProgram"); 
      } 
      async function goWorkoutList() { 
        navigate("/WorkoutList"); 
        } 
        async function goHomePage() { 
          navigate('/'); 
          }
  return (

<AppBar   position="fixed" color="primary" sx={{ display: 'flex', justifyContent:'space-around' ,  top: 'auto', bottom: 0 }}>
  <Container maxWidth={'sm'} >
    <Toolbar variant="dense" sx={{ display: 'flex', justifyContent:'space-around' }} >
      <IconButton component={Link} to='/' color="inherit" >
      <Home></Home>
      </IconButton>
      <IconButton component={Link} to='/WorkoutList'  color="inherit">
      <PlaylistAdd></PlaylistAdd>
        </IconButton>
        <IconButton component={Link} to='/WorkoutProgram'  color="inherit" >
        <FitnessCenter></FitnessCenter>
        </IconButton>
        <IconButton component={Link} to='/Profile'  color="inherit" >
        <AccountCircle></AccountCircle>
        </IconButton>
    </Toolbar>
  </Container>
</AppBar> 
  )
}
