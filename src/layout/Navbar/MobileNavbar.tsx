import { Box, IconButton, Typography } from '@mui/material'
import { NavList } from './components/NavList'
import { SearchInput } from './components/SearchInput'
import { IoMdClose } from 'react-icons/io'
import { AnimatePresence, motion } from 'framer-motion'

export function MobileNavbar({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {
  return (
    // @ts-expect-error
    <AnimatePresence exitBeforeEnter>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 1
        }}
        animate={{ x: ['-100vw', '0vw'] }}
        transition={{ ease: [0.86, 0.03, 0.1, 1], duration: 1 }}
        exit={{ x: ['-0vw', '-100vw'] }}
      >
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography fontWeight={'light'} fontSize={24}>
              Butfly
            </Typography>
            <IconButton sx={{ color: 'dark' }} onClick={() => setIsOpen(false)}>
              <IoMdClose />
            </IconButton>
          </Box>
          <SearchInput theme="dark" my={2} />
          <NavList theme="dark" />
        </Box>
      </motion.div>
    </AnimatePresence>
  )
}
