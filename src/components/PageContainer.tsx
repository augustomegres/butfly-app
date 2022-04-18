import { Box, BoxProps, Typography, useTheme } from '@mui/material'

interface PageContainerProps extends BoxProps {
  mainText: string
  secondaryText: string
}

export function PageContainer({ children, mainText, secondaryText, ...props }: PageContainerProps) {
  const { palette } = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        {mainText}
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        {secondaryText}
      </Typography>
      {children}
    </Box>
  )
}
