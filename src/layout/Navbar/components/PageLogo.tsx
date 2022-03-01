import { Box, BoxProps, Typography } from '@mui/material'
import React from 'react'
import { IoLogOutOutline } from 'react-icons/io5'

export function PageLogo(props: BoxProps) {
  return (
    <Box {...props}>
      <IoLogOutOutline style={{ fontSize: 32, color: 'white' }}></IoLogOutOutline>

      <Typography sx={{ fontWeight: 1, fontSize: 32, color: 'white', ml: 1 }}>Webstock</Typography>
    </Box>
  )
}
