import { Box, Checkbox, Collapse, Grid, Tooltip, Typography, useTheme } from '@mui/material'
import { motion, useAnimation } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { CheckoutContext } from '../Contexts/CheckoutContext'
import { Customer } from './Customer'
import { Shipping } from './Shipping'

export function AdditionalInfo(props) {
  const { palette } = useTheme()
  const controls = useAnimation()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { useCustomer, setUseCustomer, useAddress, setUseAddress } = useContext(CheckoutContext)

  function handleSetCollapsed() {
    setIsCollapsed(!isCollapsed)
    controls.start({ rotate: isCollapsed ? 180 : 0 })
  }

  useEffect(() => {
    if (useAddress) {
      setIsCollapsed(false)
    }
  }, [useAddress])

  const collapseTitleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    alignItems: 'center',
    padding: 1,
    borderRadius: 2,
    background: palette.background.default
  }
  return (
    <Box {...props}>
      <Box mb={4}>
        <Typography onClick={handleSetCollapsed} fontWeight="light" fontSize="14px" color={palette.text.secondary}>
          Informações adicionais
        </Typography>

        <Grid container mt={2}>
          <Grid item xs={12}>
            <Box sx={collapseTitleStyle}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Incluir cliente">
                  <Checkbox size="small" checked={useCustomer} onChange={e => setUseCustomer(Boolean(e.target?.checked))} />
                </Tooltip>
                <Typography ml={1} justifySelf="flex-start" textAlign="center" fontWeight="light" fontSize="14px" color={palette.text.secondary}>
                  Cliente
                </Typography>
              </Box>
            </Box>
            <Collapse in={useCustomer} timeout="auto" sx={{ padding: 1 }}>
              <Customer />
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            <Box onClick={handleSetCollapsed} sx={collapseTitleStyle}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Incluir transporte/frete">
                  <Checkbox size="small" checked={useAddress} onChange={e => setUseAddress(Boolean(e.target?.checked))} />
                </Tooltip>
                <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
                  Transporte/Frete
                </Typography>
              </Box>
              {useAddress && (
                <motion.div animate={controls} initial={false} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MdExpandMore color={palette.text.secondary} />
                </motion.div>
              )}
            </Box>
            <Collapse in={!isCollapsed && useAddress} timeout="auto">
              <Shipping />
            </Collapse>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
