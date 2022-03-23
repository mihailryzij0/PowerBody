import { Box, Typography, Rating } from '@mui/material'
import React from 'react'
import { Post } from '../../store/slices/cardsSlice'
import Header from '../header/Header'
import WorkoutList from './WorkoutList'

export default function Workout({postData}:any) {
  const {title, description, workouts, rating} = postData
  return (
    <>
          <Box sx={{ overflow: "contain", height: "200px" }}>
        <img
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={require("../../assets/fon.jpg")}
        ></img>
      </Box>
      <Typography mt={2} variant="h4" align="center">
        {title}
      </Typography>
      <Typography mt={2} mb={2} variant="body2" align="center">
        {description}
      </Typography>
      <Box sx={{ m: "0 auto", width: "max-content" }}>
        <Rating
          name="size-large"
          disabled={false}
          defaultValue={Number(rating)}
        />
      </Box>
      <Box sx={{ mt: "50px" }}>
        <WorkoutList workouts={workouts} />
        <Header />
      </Box>
    </>
  )
}
