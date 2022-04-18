import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { BoxProps } from '@mui/system'
import { addDays, format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

export function CalendarBar(props: BoxProps) {
  const isMobile = useMediaQuery('(max-width:600px)')
  const today = new Date()
  const theme = useTheme()
  const getDates = (): Date[] => {
    const range = isMobile ? 2 : 6
    const dateArr: Date[] = []
    dateArr.push(addDays(today, 0))
    for (let i = 1; i <= range; i++) {
      dateArr.unshift(addDays(new Date(), i * -1))
      dateArr.push(addDays(new Date(), i))
    }
    return dateArr
  }
  return (
    <Box {...props} sx={{ display: 'flex', justifyContent: 'space-between', ...props.sx }}>
      {getDates().map((date, index) => {
        const isToday = date.getDay() === new Date().getDay()
        return (
          <Box
            key={index}
            sx={{
              background: isToday ? 'rgba(232, 67, 67, .80)' : '#00000000',
              borderRadius: 4,
              p: 2,
            }}
          >
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'light',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  color: isToday ? 'white' : theme.palette.text.secondary,
                }}
              >
                {format(date, 'MMM', { locale: ptBr })}
              </Typography>
              <Typography
                sx={{
                  fontSize: '20px',
                  color: isToday ? 'white' : theme.palette.text.primary,
                }}
              >
                {format(date, 'dd', { locale: ptBr })}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
