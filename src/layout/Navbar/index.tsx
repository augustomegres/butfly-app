import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { IoLogOutOutline } from 'react-icons/io5'
import { Outlet, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../themes/ThemeContext'
import { PageLogo } from './components/PageLogo'
import { DesktopSidebar } from './DesktopSidebar'
import { MobileNavbar } from './MobileNavbar'
import styled from 'styled-components'

export function Navbar(props: any) {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width:600px)')
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()
  const { genericPalette } = useContext(ThemeContext)

  return (
    <PageContainer sx={{ background: genericPalette.navbar.background }}>
      {!isMobile && <DesktopSidebar />}
      {isMobile && isOpen && <MobileNavbar setIsOpen={setIsOpen} />}
      <motion.div
        animate={{ x: ['2000px', '0px'] }}
        transition={{ ease: [0.86, 0.03, 0.1, 1], duration: 1 }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
      >
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'space-between', px: 2 }}>
            <Box my="auto">
              <IconButton sx={{ color: 'white' }} onClick={() => setIsOpen(!isOpen)}>
                <HiMenu />
              </IconButton>
            </Box>
            <PageLogo
              sx={{
                mx: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 1.5
              }}
            />
            <Box my="auto">
              <IconButton sx={{ color: 'white' }} onClick={() => navigate('/login')}>
                <IoLogOutOutline />
              </IconButton>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            mt: isMobile ? 0 : 1.5,
            padding: isMobile ? 2 : 6,
            borderRadius: isMobile ? '30px 30px 0 0' : '30px 0 0 0',
            boxShadow: '0 8px 32px 0 rgba(64, 64, 64, 0.40)',
            backdropFilter: 'blur(7px)',
            overflowY: 'auto',
            flex: 1,
            ...genericPalette.body
          }}
        >
          <Box style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Outlet />
          </Box>
        </Box>
      </motion.div>
    </PageContainer>
  )
}

const PageContainer = styled(Box)`
  display: flex;
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
`
