import { Box, BoxProps, IconButton, Typography } from '@mui/material'
import { IconType } from 'react-icons'

export interface IconLabelProps extends BoxProps {
  label: string
  onSubmit?: () => void
  Icon: IconType
}
export function IconLabel({ label, onSubmit, Icon, ...props }: IconLabelProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onSubmit}>
      <IconButton color="primary" sx={{ mr: 1 }}>
        <Icon />
      </IconButton>
      <Typography>{label}</Typography>
    </Box>
  )
}
