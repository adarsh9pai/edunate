import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // Primary color of blue
    primary: {
      light: '#80e27e',
      main: '#4caf50',
      dark: '#087f23',
      contrastText: '#fff',
    },

    // Secondary color of orange
    secondary: {
      light: '#e7ff8c',
      main: '#0277bc',
      dark: '#004c8b',
      contrastText: '#fff',
    },

    error: {
      light: '#58a5ef',
      main: '#0277bc',
      dark:  '#b00020', 
      contrastText: '#fff'
    },

    background: {
      default: '#efefef',
      paper: '#fff'
    },

    common: {
      gray: '#9E9E9E'
    }
  },
  typography: {
    fontFamily: "Economica",
    useNextVariants: true,
  }
});


export default theme;