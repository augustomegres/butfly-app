import createTheme from '@mui/material/styles/createTheme';
import { buttons } from './overrides/button';
import { inputs } from './overrides/input';
import { list } from './overrides/list';
import { table } from './overrides/table';

const light = createTheme({
  palette: {
    primary: { main: '#6200ff' },
    secondary: { main: '#f62681' },
    success: { main: '#0eccc9' },
    background: { default: '#f5f9ff', paper: '#ffffff' },
    text: { primary: '#000', secondary: "#999" }
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

export { light }