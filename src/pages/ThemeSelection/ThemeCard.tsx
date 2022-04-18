import { Box, ButtonBase } from '@mui/material'
import { ContentCard } from 'components/ContentCard'
import { useContext } from 'react'
import { ThemeContext } from 'themes/ThemeContext'

interface ThemeCard {
  mainColor: string
  secondaryColor: string
  backgroundColor: string
  theme: string
}
export function ThemeCard({ mainColor, secondaryColor, backgroundColor, theme }) {
  const { setTheme } = useContext(ThemeContext)
  return (
    <ButtonBase onClick={() => setTheme(theme)}>
      <ContentCard sx={{ width: 220, height: 150, background: mainColor, p: 0, overflow: 'hidden', cursor: 'pointer' }}>
        <Box sx={{ height: '8px' }}></Box>
        <Box display="flex" height="100%">
          <Box sx={{ width: '35%' }}>
            <Box sx={{ height: '8px', background: backgroundColor, mt: 2, mx: 1, opacity: 0.2, borderRadius: 2 }}></Box>
            <Box sx={{ height: '8px', background: backgroundColor, mt: 1, mx: 1, opacity: 0.2, borderRadius: 2 }}></Box>
            <Box sx={{ height: '8px', background: backgroundColor, mt: 1, mx: 1, opacity: 0.2, borderRadius: 2 }}></Box>
            <Box sx={{ height: '8px', background: backgroundColor, mt: 1, mx: 1, opacity: 0.2, borderRadius: 2 }}></Box>
          </Box>
          <Box
            sx={{
              background: backgroundColor,
              borderRadius: '12px 0 0 0',
              width: '100%',
              height: '100%'
            }}
          ></Box>
        </Box>
      </ContentCard>
    </ButtonBase>
  )
}
