import { createTheme } from '@mui/material/styles'
import { autocomplete } from './overrides/autocomplete'
import { buttons } from './overrides/button'
import { checkbox } from './overrides/checkbox'
import { dialog } from './overrides/dialog'
import { inputs } from './overrides/input'
import { list } from './overrides/list'
import { table } from './overrides/table'
import { GenericPaletteProps } from './types/Theme'

const muiTheme = createTheme({
  palette: {
    primary: { main: '#0077ff' },
    secondary: { main: '#03fcf8' },
    success: { main: '#03fcf8' },
    mode: 'dark',
    background: { default: '#303030', paper: '#404040' },
    text: { primary: '#ffffff', secondary: '#dedede' }
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  },
  components: {
    ...inputs,
    ...autocomplete,
    ...buttons,
    ...list,
    ...table,
    ...dialog,
    ...checkbox,
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '.5px solid #40404020',
          borderRadius: 10,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        invisible: {
          background: 'none',
          backdropFilter: 'none'
        },
        root: {
          background: 'rgba(255,255,255, .15)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)'
        }
      }
    }
  }
})

const themePalette: GenericPaletteProps = {
  title: 'Escuro',
  navbar: { background: '#0077ff' },
  body: { background: '#303030' },
  card: { background: '#404040' },
  toast: { borderRadius: 12, margin: 8, background: '#404040' }
}

export default { muiTheme, themePalette }
