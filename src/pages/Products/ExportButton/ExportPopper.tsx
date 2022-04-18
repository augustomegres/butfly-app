import { Box, Grid, List, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material'
import { FaFileCsv, FaFilePdf } from 'react-icons/fa'

export function ExportPopper({ isOpen, anchorEl, onClose, ...props }) {
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
            <Typography variant="overline">Exportar produtos</Typography>
          </Grid>
        </Grid>
        <List sx={{ mx: 1 }}>
          <ListItemButton>
            <ListItemIcon>
              <FaFileCsv />
            </ListItemIcon>
            <ListItemText>Exportar em CSV</ListItemText>
          </ListItemButton>

          <ListItemButton>
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
