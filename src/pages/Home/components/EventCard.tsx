import { Box, Typography, useTheme } from '@mui/material'
import { formatDistance } from 'date-fns'
import { FaDollarSign } from 'react-icons/fa'
import ptBR from 'date-fns/locale/pt-BR'

interface EventCardProps {
  events: {
    icon: string
    title: string
    description?: string
    date: Date | string
  }[]
}
const EventCard = ({ events }: EventCardProps) => {
  const { palette } = useTheme()
  return (
    <>
      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
        Eventos recentes
      </Typography>
      {events.map((event, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <FaDollarSign style={{ fontSize: 24, color: palette.secondary.main }} />
          <Box>
            <Typography sx={{ ml: 2, fontSize: 16, fontWeight: 'normal', color: palette.text.primary }}>{event.title}</Typography>
            {event.description && (
              <Typography sx={{ ml: 2, fontSize: 12, fontWeight: 'light', color: palette.text.secondary }}>{event.description}</Typography>
            )}
            <Typography sx={{ ml: 2, fontSize: 12, fontWeight: 'light', color: palette.text.secondary }}>
              {formatDistance(new Date(event.date), new Date(), { addSuffix: true, locale: ptBR })}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  )
}

export { EventCard }
