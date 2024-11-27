import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      darkRed: string;
      offWhite: string;
      lightGray: string;
      darkGray: string;
    };
  }
  interface PaletteOptions {
    custom: {
      darkRed: string;
      offWhite: string;
      lightGray: string;
      darkGray: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B403D',
      light: '#B85D5A',
      dark: '#7A3230',
    },
    secondary: {
      main: '#313131',
      light: '#4A4A4A',
      dark: '#242424',
    },
    background: {
      default: '#FBFAFA',
      paper: '#FFFFFF',
    },
    custom: {
      darkRed: '#9B403D',
      offWhite: '#FBFAFA',
      lightGray: '#DDD6CC',
      darkGray: '#313131',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#313131',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#313131',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#313131',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          backgroundColor: '#9B403D',
          color: '#FBFAFA',
          '&:hover': {
            backgroundColor: '#7A3230',
          },
        },
        outlined: {
          borderColor: '#9B403D',
          color: '#9B403D',
          '&:hover': {
            borderColor: '#7A3230',
            color: '#7A3230',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FBFAFA',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FBFAFA',
          color: '#313131',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

export default theme;
