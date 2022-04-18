import { Components } from '@mui/material'

export const table: Components = {
  MuiTableContainer: {
    styleOverrides: {
      root: {
        width: '100%',
        borderRadius: 10,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& th': {
          fontWeight: 'bold',
        },
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '& td': {
          fontWeight: 'light',
        },
      },
    },
  },
}
