import { Box, Divider, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'
import { NavList } from './components/NavList'
import { PageLogo } from './components/PageLogo'
import { SearchInput } from './components/SearchInput'
import { User } from './components/User'


export function DesktopSidebar() {
  const isMobile = useMediaQuery('(max-width:600px)')
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      transition={{ ease: [0.86, 0.03, 0.1, 1], duration: 1 }}
      animate={{ x: ['-1000px', '0px'] }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: isMobile ? 80 : 300,
          alignItems: 'center',
        }}
      >
        <PageLogo sx={{ display: 'flex', alignItems: 'center', mt: 5 }} />
        <SearchInput theme="white" sx={{ borderRadius: 2, my: 4, width: '80%' }} />
        <NavList theme="white" sx={{ width: '80%', maxWidth: 360, mx: 'auto' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        <Divider color="white" sx={{ opacity: 0.2, my: 2 }} />
        <User />
      </Box>
    </motion.div >
  )
}
