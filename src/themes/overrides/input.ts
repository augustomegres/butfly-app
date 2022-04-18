import { Components } from '@mui/material'

export const inputs: Components = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        minHeight: 46
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        fontSize: '13px',
        borderRadius: 8
      },
      input: {
        padding: '16px 14px',
        height: 46,
        boxSizing: 'border-box'
      }
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: '13px'
      },
      shrink: {
        transform: 'translate(14px, -6px) scale(.8) !important'
      },
      outlined: {
        transform: 'translate(14px, 14px) scale(1)'
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        borderRadius: 16
      }
    }
  }
}
