import { Box, useMediaQuery, useTheme } from '@mui/material'
import { BoxProps } from '@mui/system'
import React from 'react'

export function ContentCard(props: BoxProps) {
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        borderRadius: 2,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        py: 4,
        px: isMobile ? 2 : 4,
        background: theme.palette.background.paper,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  )
}
