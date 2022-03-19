import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Header from '../components/header/Header'
import PostItem from '../components/post/PostItem'
import {getColectionFirebase, setItemFirebase} from '../firebaseAPI'
import { getPost } from '../store/slices/workoutListSlice';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
export default function WorkoutList() {
   const posts = useAppSelector((state)=> state.workouts.workouts)
   const dispach = useAppDispatch()

  return  (
        <div>
      <Button onClick={(e)=>{
        dispach(getPost())
      }
        } >dd</Button>
        {posts?.map((post, i)=>(
          <PostItem key={i} postData={post} ></PostItem>
        ))}
  
      <Header></Header>
      </div>
  )
}
