import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Box, Typography, Grid } from '@mui/material';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatsDashboard = ({ tasks = [] }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5">Aucune tâche à afficher dans les statistiques.</Typography>
            </Box>
        );
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.is_completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const categories = [...new Set(tasks.map((task) => task.category))];
    const tasksPerCategory = categories.map((category) =>
        tasks.filter((task) => task.category === category).length
    );

    const pieData = {
        labels: ['Terminées', 'En attente'],
        datasets: [
            {
                data: [completedTasks, pendingTasks],
                backgroundColor: ['#4caf50', '#f44336'],
            },
        ],
    };

    const barData = {
        labels: categories,
        datasets: [
            {
                label: 'Tâches par catégorie',
                data: tasksPerCategory,
                backgroundColor: '#2196f3',
            },
        ],
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Tableau de bord des statistiques
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Répartition des tâches</Typography>
                    <Pie data={pieData} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Tâches par catégorie</Typography>
                    <Bar data={barData} options={{ responsive: true }} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatsDashboard;
