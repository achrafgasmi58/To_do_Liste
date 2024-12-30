import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // Changez à 'dark' pour le mode sombre par défaut
        primary: {
            main: '#1976d2', // Bleu
        },
        secondary: {
            main: '#dc004e', // Rouge
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h5: {
            fontWeight: 600,
        },
    },
});

export default theme;
