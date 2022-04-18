import { Button, Hidden, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { IoChevronDown, IoDocumentText } from 'react-icons/io5'
import { ExportPopper } from './ExportPopper'

export function ExportButton() {
  const { palette } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  function open(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsOpen(true)
    setAnchorEl(event.currentTarget)
  }
  return (
    <>
      <Button style={{ height: 46, background: palette.background.paper, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }} onClick={open}>
        <IoDocumentText size={20} color={palette.text.primary} />
        <Hidden mdDown>
          <Typography mx={1} color={palette.text.primary}>
            Exportar
          </Typography>
        </Hidden>
        <IoChevronDown style={{ marginLeft: 4 }} color={palette.text.primary} />
      </Button>
      <ExportPopper isOpen={isOpen} anchorEl={anchorEl} onClose={() => setIsOpen(false)} />
    </>
  )
}
