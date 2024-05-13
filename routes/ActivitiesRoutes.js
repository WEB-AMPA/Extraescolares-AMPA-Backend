import express from 'express';
import * as activitiesController from '../controllers/ActivitiesController.js';

const router = express.Router();

// Ruta para crear una nueva actividad
router.post('/activities', async (req, res) => {
    try {
        const activityData = req.body;
        const newActivity = await activitiesController.createActivity(activityData);
        res.json(newActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener una actividad por su ID
router.get('/activities/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const activity = await activitiesController.getActivityById(activityId);
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar una actividad por su ID
router.put('/activities/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const newData = req.body;
        const updatedActivity = await activitiesController.updateActivity(activityId, newData);
        res.json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar una actividad por su ID
router.delete('/activities/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const deletedActivity = await activitiesController.deleteActivity(activityId);
        res.json(deletedActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;