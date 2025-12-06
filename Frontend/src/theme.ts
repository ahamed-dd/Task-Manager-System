// theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e', // Pink/Red
      light: '#f50057',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16, // base desktop size

    h4: {
      fontWeight: 600,
      fontSize: '2rem',        // ~32px desktop
      '@media (max-width:960px)': {
        fontSize: '1.75rem',   // tablets
      },
      '@media (max-width:600px)': {
        fontSize: '1.5rem',    // phones
      },
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  components: {
    // global body styles (background, reset)
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // no ALL CAPS
          borderRadius: 8,
          padding: '8px 20px',
          '@media (max-width:600px)': {
            padding: '6px 16px', // slightly smaller on phones
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          // subtle shadow, good for login card
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        // default when you just write <Container>
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          // padding for all viewports
          paddingLeft: 16,
          paddingRight: 16,
          // wider on large desktop
          '@media (min-width:1280px)': {
            maxWidth: '1400px',
          },
        },
      },
    },
  },
});
