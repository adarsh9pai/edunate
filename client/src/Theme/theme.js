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
      light: '#b2fef7',
      main: '#80cbc4',
      dark: '#4f9a94',
      contrastText: '#fff',
    },

    error: {
      light: '#b00020',
      main: '#b00020',
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
    fontFamily: ['"Economics"'].join(','),
    useNextVariants: true,
  }
});


export default theme;