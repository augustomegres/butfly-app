import { Box, Typography, useTheme } from '@mui/material'
import Form from './components/Form'
import LeftContainer from './LeftContainer'

export function Register() {
  const { palette } = useTheme()
  return (
    <Box p={0} display="flex" height="100vh" style={{ background: palette.background.default }}>
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
          <Typography color={palette.text.primary} fontWeight="light" textAlign="left" sx={{ ml: 1, mb: 0, fontSize: 24, fontWeight: 'light' }}>
            Inicie grátis, absolutamente grátis!
          </Typography>
          <Typography color={palette.text.secondary} fontWeight="light" textAlign="left" sx={{ ml: 1, mb: 4, fontSize: 14, fontWeight: 'light' }}>
            Não é necessário cadastro de cartão, na Butfly você inicia grátis.
          </Typography>
          <Form style={{ maxWidth: 500 }} />
        </Box>
      </Box>
    </Box>
  )
}
