import { Box, Grid } from '@mui/material'
import { ThemeCard } from './ThemeCard'

export function ThemeList() {
  return (
    <Grid container m={2} spacing={2}>
      <Grid item xs={3}>
        <ThemeCard mainColor={'#6200ff'} secondaryColor={'#6200ff'} backgroundColor="#fff" theme={'light'} />
      </Grid>
      <Grid item xs={3}>
        <ThemeCard mainColor={'#0077ff'} secondaryColor={'#0077ff'} backgroundColor="#303030" theme={'dark'} />
      </Grid>
    </Grid>
  )
}
