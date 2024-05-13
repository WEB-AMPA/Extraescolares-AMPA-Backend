import Activity from '../models/ActivitiesModel.js';

// Función para crear una nueva actividad
export async function createActivity(activityData) {
    try {
        const activity = new Activity(activityData);
        await activity.save();
        return activity;
    } catch (error) {
        throw error;
    }
}

// Función para obtener una actividad por su ID
export async function getActivityById(activityId) {
    try {
        const activity = await Activity.findById(activityId);
        return activity;
    } catch (error) {
        throw error;
    }
}

// Función para actualizar una actividad por su ID
export async function updateActivity(activityId, newData) {
    try {
        const activity = await Activity.findByIdAndUpdate(activityId, newData, { new: true });
        return activity;
    } catch (error) {
        throw error;
    }
}

// Función para eliminar una actividad por su ID
export async function deleteActivity(activityId) {
    try {
        const deletedActivity = await Activity.findByIdAndDelete(activityId);
        return deletedActivity;
    } catch (error) {
        throw error;
    }
}