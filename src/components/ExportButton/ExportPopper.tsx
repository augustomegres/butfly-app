import { Box, Grid, List, ListItemButton, ListItemIcon, ListItemText, Popover, PopoverProps, Typography } from '@mui/material'
import { FaFileCsv, FaFilePdf } from 'react-icons/fa'

interface ExportPopper extends Omit<PopoverProps, 'open'> {
  onCsvExport: () => void
  onPdfExport: () => void
  isOpen: boolean
}

export function ExportPopper({ onCsvExport, onPdfExport, isOpen, anchorEl, onClose, title, ...props }: ExportPopper) {
  return (
    <Popover
      id="export-popover"
      {...props}
      open={isOpen}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      onClose={onClose}
    >
      <Box boxShadow={2}>
        <Grid container spacing={2} p={2} pb={0} width={280}>
          <Grid item xs={12}>
            <Typography variant="overline">{title}</Typography>
          </Grid>
        </Grid>
        <List sx={{ mx: 1 }}>
          <ListItemButton onClick={onCsvExport}>
            <ListItemIcon>
              <FaFileCsv />
            </ListItemIcon>
            <ListItemText>Exportar em CSV</ListItemText>
          </ListItemButton>

          <ListItemButton onClick={onPdfExport}>
            <ListItemIcon>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText>Exportar em PDF</ListItemText>
          </ListItemButton>
        </List>
      </Box>
    </Popover>
  )
}
