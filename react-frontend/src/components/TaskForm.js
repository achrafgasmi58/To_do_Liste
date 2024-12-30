import React, { useState } from 'react';
import { createTask } from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            category,
            due_date: dueDate,
            is_completed: false,
        };
        try {
            const createdTask = await createTask(newTask);
            onTaskCreated(createdTask);
            setTitle('');
            setDescription('');
            setCategory('');
            setDueDate('');
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Ajouter une nouvelle tâche
            </Typography>
            <TextField
                label="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
            />
            <TextField
                label="Catégorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date limite"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button type="submit" variant="contained" color="primary">
                Ajouter
            </Button>
        </Box>
    );
};

export default TaskForm;
