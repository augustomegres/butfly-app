import { Box, Hidden, Typography, useTheme } from '@mui/material'

export default function LeftContainer() {
  const { palette } = useTheme()
  return (
    <Hidden smDown>
      <Box
        sx={{ background: palette.background.paper, m: 1, borderRadius: 4 }}
        width={{ sm: '50%', md: '40%', lg: '25%' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        boxShadow="rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px"
      >
        <Box width="80%">
          <Typography fontSize={30} fontWeight="light" maxWidth="75%" mb={4} color={palette.text.primary}>
            Com Butfly,
            <br />
            você está no controle.
          </Typography>
          <img src="https://res.cloudinary.com/dch1p9yky/image/upload/v1644786895/data.svg" alt="data" style={{ width: '90%' }} />
        </Box>
      </Box>
    </Hidden>
  )
}
