import { Avatar, IconButton, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { IoLogOut } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export function User() {
  const isMobile = useMediaQuery('(max-width:600px)')
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar>N</Avatar>
      <Box sx={{ display: isMobile ? 'none' : 'initial' }}>
        <Typography sx={{ color: 'white', ml: 2, fontWeight: 'bold', fontSize: 13 }}>
          José Augusto Megres
        </Typography>
        <Typography sx={{ color: 'white', ml: 2, fontWeight: 'normal', fontSize: 11 }}>
          Administrador
        </Typography>
      </Box>
      <IconButton
        sx={{ ml: 'auto', display: isMobile ? 'none' : 'initial' }}
        onClick={() => navigate('/login')}
      >
        <IoLogOut color="white"></IoLogOut>
      </IconButton>
    </Box>
  )
}
