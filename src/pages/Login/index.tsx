import { Box, Typography, useTheme } from '@mui/material'
import Form from './components/Form'
import LeftContainer from './LeftContainer'

export function Login() {
  const theme = useTheme()
  return (
    <Box p={0} display="flex" height="100vh" style={{ background: theme.palette.background.default, overflow: 'hidden' }}>
      <LeftContainer />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ m: 1, mt: 2 }}
        width={{ base: '100%', sm: '50%', md: '60%', lg: '65%' }}
        padding={2}
      >
        <Box display="flex" flexDirection={'column'}>
          <Typography color={theme.palette.text.primary} fontWeight="light" textAlign="left" sx={{ ml: 1, mb: 0, fontSize: 24, fontWeight: 'light' }}>
            Logue-se na Butfly
          </Typography>
          <Typography
            color={theme.palette.text.secondary}
            fontWeight="light"
            textAlign="left"
            sx={{ ml: 1, mb: 1, fontSize: 14, fontWeight: 'light' }}
          >
            Preencha os campos abaixo com seus dados
          </Typography>
          <Form style={{ maxWidth: 500 }} />
        </Box>
      </Box>
    </Box>
  )
}
