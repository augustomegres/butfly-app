import { Box, Typography } from '@mui/material'

export function MoreColors({ ...props }) {
  return (
    <Box
      sx={{
        borderRadius: 50,
        width: 50,
        height: 50,
        background: 'lightgray',
        m: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography fontWeight="light" fontSize={20}>
        +3
      </Typography>
    </Box>
  )
}
