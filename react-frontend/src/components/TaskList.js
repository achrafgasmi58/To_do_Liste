import React, { useState } from 'react';
import { deleteTask, updateTask } from '../services/api';
import TaskForm from './TaskForm';
import TaskEditForm from './TaskEditForm';
import Notification from './Notification';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';

const TaskList = ({ tasks, setTasks }) => {
    const [editingTask, setEditingTask] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const showNotification = (message, severity) => {
        setNotification({ open: true, message, severity });
    };

    const handleTaskCreated = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        showNotification('Tâche ajoutée avec succès !', 'success');
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            showNotification('Tâche supprimée avec succès !', 'success');
        } catch {
            showNotification('Erreur lors de la suppression de la tâche !', 'error');
        }
    };

    const handleMarkAsCompleted = async (task) => {
        try {
            const updatedTask = { ...task, is_completed: true };
            await updateTask(task.id, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
            );
            showNotification('Tâche marquée comme terminée !', 'success');
        } catch {
            showNotification('Erreur lors de la mise à jour de la tâche !', 'error');
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditingTask(null);
        showNotification('Tâche modifiée avec succès !', 'success');
    };

    const uniqueCategories = ['all', ...new Set(tasks.map((task) => task.category))];

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            filter === 'all' ||
            (filter === 'completed' && task.is_completed) ||
            (filter === 'pending' && !task.is_completed);
        const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <Box sx={{ padding: 3 }}>
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                severity={notification.severity}
            />
            <TaskForm onTaskCreated={handleTaskCreated} />
            {editingTask ? (
                <TaskEditForm
                    task={editingTask}
                    onTaskUpdated={handleTaskUpdated}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            label="Rechercher"
                            variant="outlined"
                            fullWidth
                            margin="dense" // Corrected
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            displayEmpty
                            fullWidth
                            margin="dense" // Corrected
                        >
                            <MenuItem value="all">Toutes Status</MenuItem>
                            <MenuItem value="completed">Terminées</MenuItem>
                            <MenuItem value="pending">En attente</MenuItem>
                        </Select>
                        <Select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            displayEmpty
                            fullWidth
                            margin="dense" // Corrected
                        >
                            {uniqueCategories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category === 'all' ? 'Toutes les catégories' : category}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titre</TableCell>
                                    <TableCell>Catégorie</TableCell>
                                    <TableCell>Échéance</TableCell>
                                    <TableCell>Statut</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.category}</TableCell>
                                        <TableCell>{task.due_date}</TableCell>
                                        <TableCell>
                                            {task.is_completed ? 'Terminé' : 'En attente'}
                                        </TableCell>
                                        <TableCell>
                                            {!task.is_completed && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => handleMarkAsCompleted(task)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Terminer
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEditTask(task)}
                                                sx={{ mr: 1 }}
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteTask(task.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
};

export default TaskList;
