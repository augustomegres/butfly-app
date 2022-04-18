import { Box, BoxProps, Typography } from '@mui/material'

interface SizeProps extends BoxProps {
  size: string
}
export function Size({ size, ...props }: SizeProps) {
  return (
    <Box
      {...props}
      sx={{
        borderRadius: 2,
        background: '#ddd',
        width: 40,
        height: 40,
        m: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography>{size}</Typography>
    </Box>
  )
}
