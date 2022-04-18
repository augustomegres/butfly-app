import { Box, BoxProps, Typography } from '@mui/material'
import { GiButterfly } from 'react-icons/gi'

export function PageLogo(props: BoxProps) {
  return (
    <Box {...props}>
      <GiButterfly style={{ fontSize: 32, color: 'white' }} />
      <Typography sx={{ fontWeight: 1, fontSize: 32, color: 'white', ml: 1 }}>Butfly</Typography>
    </Box>
  )
}
