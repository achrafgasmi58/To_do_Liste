import axios from 'axios';


const API_URL = 'http://localhost:5000/tasks';


// Récupérer toutes les tâches
export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Créer une nouvelle tâche
export const createTask = async (task) => {
    const response = await axios.post(API_URL, task);
    return response.data;
};

// Mettre à jour une tâche existante
export const updateTask = async (id, updates) => {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
};

// Supprimer une tâche
export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
