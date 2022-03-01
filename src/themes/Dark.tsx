import { createTheme } from '@mui/material/styles';
import { buttons } from './overrides/button';
import { inputs } from './overrides/input';
import { list } from './overrides/list';
import { table } from './overrides/table';

const dark = createTheme({
  palette: {
    primary: { main: '#404040' },
    secondary: { main: '#03fcf8' },
    success: { main: '#03fcf8' },
    mode: 'dark',
    background: { default: '#303030', paper: '#404040' },
    text: { primary: '#ffffff', secondary: "#dedede" }
  },
  typography: {
    fontFamily: `"Lato", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    ...inputs,
    ...buttons,
    ...list,
    ...table
  }
});

export { dark }