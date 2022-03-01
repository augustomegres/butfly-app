import {
  Box, Grid,
  Typography, useTheme
} from '@mui/material'
import React from 'react'
import { CalendarBar } from './components/Calendar'
import { ContentCard } from '../../components/ContentCard'
import { LineChart } from './components/MixedChart'
import { EventCard } from './components/EventCard'
import InfoCard from './components/InfoCard'
export function Home(props: any) {
  const { palette } = useTheme()
  return (
    <Box>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        Dashboard
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        Aqui você poderá acompanhar os gráficos de sua empresa com atualizações em tempo real 😱
      </Typography>

      <Grid container spacing={2} my={1} sx={{ gridAutoFlow: 'column' }}>
        <Grid item xs={12} md={12}>
          <ContentCard>
            <CalendarBar />
          </ContentCard>
        </Grid>

        {[1, 2, 3].map(() => (
          <Grid item xs={12} md={4}>
            <ContentCard p={4}>
              <InfoCard title={'Gastos mensais (Jan/2022)'} value={1400} compareValue={1300} isBetter={'greater'} />
            </ContentCard>
          </Grid>
        ))}

        <Grid item xs={12} md={4} sx={{ display: 'flex', maxHeight: 500 }}>
          <ContentCard p={4} sx={{ width: '100%', overflowY: 'scroll' }}>
            <EventCard events={[{ title: 'Nova venda registrada', description: 'Descrição', icon: 'Ícone', date: '2021-01-01' }]} />
          </ContentCard>
        </Grid>

        <Grid item xs={12} md={8} sx={{ display: 'flex', }}>
          <ContentCard p={4} sx={{ width: '100%', maxWidth: '100%' }} >
            <LineChart />
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  )
}
