import Header from '../components/header/Header'
import React, { useState } from 'react';
import SignUp from '../components/form/SignUp';
import { Button } from '@mui/material';
import Login from '../components/form/Login';





export default function LoginFormPage() {
  const [inputSwitch, setInputSwitch] = useState(false)
  const handleClick = ()=>{
    inputSwitch ? setInputSwitch(false) :  setInputSwitch(true)
  }
   return    (
    <div>
     <Header/>
     <main>
       {inputSwitch? <SignUp/> : <Login/> }
      

      <Button onClick={handleClick} >регистрация</Button>
    </main>
    </div>
  )
}
