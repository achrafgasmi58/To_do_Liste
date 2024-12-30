import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import TaskList from './components/TaskList';
import StatsDashboard from './components/StatsDashboard';
import { getTasks } from './services/api';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
        },
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error('Erreur lors du chargement des tâches :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Typography variant="h6">Chargement...</Typography>
                </Box>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ display: 'flex' }}>
                    {/* Menu latéral */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: 240,
                                boxSizing: 'border-box',
                            },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                <ListItem button component={Link} to="/">
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Tâches" />
                                </ListItem>
                                <ListItem button component={Link} to="/stats">
                                    <ListItemIcon>
                                        <BarChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Statistiques" />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>

                    {/* Contenu principal */}
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, ml: 240 }}>
                            <Toolbar>
                                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                    Gestionnaire de Tâches
                                </Typography>
                                <IconButton color="inherit" onClick={toggleDarkMode}>
                                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Toolbar />
                        <Routes>
                            <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks} />} />
                            <Route path="/stats" element={<StatsDashboard tasks={tasks} />} />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
