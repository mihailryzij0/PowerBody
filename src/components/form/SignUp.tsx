import React from 'react'
import {Form} from './Form'
import { useDispatch } from 'react-redux'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setUser} from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const dispach =useDispatch();
  let navigate = useNavigate()
  const hendleRegistr = (email:string,pass:string) =>{
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,pass)
    .then(({user})=>{
      console.log(user)
      dispach(setUser({
        email:user.email,
        id:user.uid,
        token:user.accessToken,
      }))
      navigate('Profile')
    })
    .catch(console.error)
  }
  return (
    <Form
     title='регистрация'
     handleClick={hendleRegistr}
    />
  )
}
