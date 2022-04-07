import { Box, Button, styled, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setPostCards } from '../../store/slices/cardsSlice';
import { setPostData } from '../../store/slices/postSlice';


export interface AdminWorkoutProps{
  postKey:'vitamins' | 'workouts';
}

export default  function AdminWorkoutContent({postKey}:AdminWorkoutProps) {
  const [post, setPost] = useState({
    description:"",
    id:new Date().getUTCMilliseconds(),
    rating:'4',
    title:'',
    workouts:[
      {
        exercises:['','','','','',''],
        workoutName:""
      },
      {
        exercises:['','','','','',''],
        workoutName:""
      },
      {
        exercises:['','','','','',''],
        workoutName:""
      }
    ]
  })

  let newPost=  JSON.parse(JSON.stringify(post))
  const setWorkoutInput =
   (parentIndex:number,index:number) =>
   (e: ChangeEvent<HTMLInputElement>)=> {
    newPost.workouts[parentIndex].exercises[index] = e.target.value;
      setPost(newPost)
  };

  const setWorkoutNameInput =
   (index:number) =>
    (e: ChangeEvent<HTMLInputElement>)=> {
    newPost.workouts[index].workoutName = e.target.value;
    setPost(newPost)
  };

  const setTitleInput =
   (e: ChangeEvent<HTMLInputElement>)=> {
   newPost.title = e.target.value;
   setPost(newPost)
 };

 const setDescriptionInput =
  (e: ChangeEvent<HTMLTextAreaElement>)=> {
  newPost.description = e.target.value;
  setPost(newPost)
};

const dispatch = useAppDispatch();
const handleClick=()=>{
  const {workouts,description, ...cardsData}= post
  if(postKey === 'vitamins'){
    const {workouts, ...vitaminPostData}= post
    dispatch(setPostData(vitaminPostData))
    dispatch(setPostCards({cardsData, postKey}))
    console.log(cardsData)
  }else{
    dispatch(setPostData(post))
    dispatch(setPostCards({cardsData, postKey}))
  }
}
 const AdminTextareaAutosize = styled(TextareaAutosize)`
   min-height: 200px;
   mix-width: 100%;
   margin-top: 40px;
`;
const AdminTextField = styled(TextField)`
   mix-width: 90%;
`;

  return (
    <> 
     <TextField value={post.title} fullWidth label="Назавание тренировки" onChange={setTitleInput} />
     <AdminTextareaAutosize
          onChange={()=>setDescriptionInput}
          value={post.description}
          aria-label="minimum height"
          placeholder="Введите описание"
        />
        {postKey=== "workouts" &&
         post.workouts.map((element,parentIndex)=>(
       <Box key={parentIndex} mt={1} mb={1}>
         <Typography> {parentIndex +1} день </Typography>
         <AdminTextField
          value={element.workoutName} fullWidth label="Тренировка" onChange={()=>setWorkoutNameInput(parentIndex)} />
        {element.exercises.map((el,index)=>(
       <AdminTextField value={el} onChange={setWorkoutInput(parentIndex,index)} key={index} fullWidth label="Упражнение"/>
           ))} 
      </Box>
       ))
        }
        <Button onClick={()=>handleClick()} >Создать</Button>
    </>
  )
}
