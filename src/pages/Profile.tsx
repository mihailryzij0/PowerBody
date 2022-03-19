import { Box, Button, Input, List } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Header from '../components/header/Header'
import useAuth from '../hooks/use-auth'

export default function Profile() {
  const {isAuth, email} = useAuth();
    return !isAuth ? (
      <Box>
        <Navigate to="/LoginFormPage"  replace />
        <Header></Header>
      </Box>
    ) :  (
      <Box>
        <Header></Header>
      </Box>
    )

}
