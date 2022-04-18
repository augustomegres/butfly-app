import createTheme from '@mui/material/styles/createTheme'
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
    primary: { main: '#6200ff' },
    secondary: { main: '#f62681' },
    success: { main: '#0eccc9' },
    background: { default: '#f5f9ff', paper: '#ffffff' },
    text: { primary: '#000', secondary: '#999' }
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
          border: '.5px solid #f9f9f9',
          borderRadius: 10,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255, .15)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)'
        },
        invisible: {
          background: 'none',
          backdropFilter: 'none'
        }
      }
    }
  }
})

const themePalette: GenericPaletteProps = {
  title: 'Claro',
  navbar: { background: '#6200ff' },
  body: { background: '#f5f9ff' },
  card: { background: '#ffffff' },
  toast: { borderRadius: 12, margin: 8, background: '#f5f9ff' }
}

export default { muiTheme, themePalette }
