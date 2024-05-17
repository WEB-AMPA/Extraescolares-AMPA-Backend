import Activity from '../models/ActivityModel.js';

// Crear una nueva actividad
export const createActivity = async (req, res) => {
  try {
    const { activity, categories, center } = req.body;
    const newActivity = await Activity.create({ activity, categories, center });
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las actividades
export const getAllActivities = async (req, res) => {
  try {
    const allActivities = await Activity.find().populate('categories').populate('center');
    res.json(allActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar una actividad
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { activity, categories, center } = req.body;
    const updatedActivity = await Activity.findByIdAndUpdate(id, { activity, categories, center }, { new: true });
    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una actividad
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id);
    res.json(deletedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};