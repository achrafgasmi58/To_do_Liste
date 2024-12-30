import React, { useState } from 'react';
import { updateTask } from '../services/api';
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

const TaskEditForm = ({ task, onTaskUpdated, onCancel }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [category, setCategory] = useState(task.category);
    const [dueDate, setDueDate] = useState(task.due_date);
    const [isCompleted, setIsCompleted] = useState(task.is_completed);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updates = {
            title,
            description,
            category,
            due_date: dueDate,
            is_completed: isCompleted,
        };
        try {
            const updatedTask = await updateTask(task.id, updates);
            onTaskUpdated(updatedTask);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche:', error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                backgroundColor: 'background.paper',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 400,
                margin: 'auto',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Modifier la tâche
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
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                        color="primary"
                    />
                }
                label="Tâche terminée"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    Enregistrer
                </Button>
                <Button variant="outlined" color="error" onClick={onCancel}>
                    Annuler
                </Button>
            </Box>
        </Box>
    );
};

export default TaskEditForm;
