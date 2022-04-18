import { Box, BoxProps, Chip, Typography, useTheme } from '@mui/material'
import { TiArrowSortedDown, TiArrowSortedUp, TiMinus } from 'react-icons/ti'
import { currencyFormat } from '../../../utils/currencyFormat'

interface InfoCardProps extends BoxProps {
  title: string
  value: number
  compareValue: number
  isBetter?: 'greater' | 'lower'
}
const InfoCard = ({ title, value, compareValue, isBetter = 'greater', ...rest }: InfoCardProps) => {
  const { palette } = useTheme()
  const getPercent = (value: number, compareValue: number) => {
    const percent = (value - compareValue) / compareValue
    return percent
  }

  const getColors = () => {
    let colors = {
      background: '',
      foreground: '',
      icon: <></>,
    }

    if (isBetter === 'greater') {
      if (getPercent(value, compareValue) > 0) {
        colors = {
          background: `${palette.success.main}20`,
          foreground: palette.success.main,
          icon: <TiArrowSortedUp color={palette.success.main} />,
        }
      }

      if (getPercent(value, compareValue) < 0) {
        colors = {
          background: `${palette.error.main}20`,
          foreground: palette.error.main,
          icon: <TiArrowSortedDown color={palette.error.main} />,
        }
      }
    }

    if (isBetter === 'lower') {
      if (getPercent(value, compareValue) < 0) {
        colors = {
          background: `${palette.success.main}20`,
          foreground: palette.success.main,
          icon: <TiArrowSortedDown color={palette.success.main} />,
        }
      }

      if (getPercent(value, compareValue) > 0) {
        colors = {
          background: `${palette.error.main}20`,
          foreground: palette.error.main,
          icon: <TiArrowSortedUp color={palette.error.main} />,
        }
      }
    }

    if (getPercent(value, compareValue) === 0) {
      colors = {
        background: '#dddddd20',
        foreground: '#dddddd',
        icon: <TiMinus color="#dddddd" />,
      }
    }

    return colors
  }

  return (
    <>
      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontSize={32} fontWeight="light" color={palette.text.primary}>
          {currencyFormat(value)}
        </Typography>
        <Chip
          label={`${(getPercent(value, compareValue) * 100).toFixed(1)}%`}
          sx={{ background: getColors()?.background, color: getColors()?.foreground }}
          icon={getColors()?.icon}
        />
      </Box>
    </>
  )
}

export default InfoCard
