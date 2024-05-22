import BreakfastModel from '../models/BreakfastModel.js';

// Crear una nueva asistencia de desayuno
export const createBreakfastAttendance = async (req, res) => {
    try {
        const { date, partner_id, attendance } = req.body;
        if (!date || !partner_id || attendance === undefined) {
            return res.status(400).json({ message: 'Todos los campos son requeridos: date, partner_id, attendance' });
        }

        const newBreakfast = new BreakfastModel(req.body);
        const savedBreakfast = await newBreakfast.save();
        res.status(201).json(savedBreakfast);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las asistencias de desayuno
export const getAllBreakfastAttendances = async (req, res) => {
    try {
        const breakfasts = await BreakfastModel.find();
        res.status(200).json(breakfasts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una asistencia de desayuno por ID
export const getBreakfastAttendanceById = async (req, res) => {
    try {
        const breakfast = await BreakfastModel.findById(req.params.id);
        if (!breakfast) {
            return res.status(404).json({ message: 'Asistencia de desayuno no encontrada' });
        }
        res.status(200).json(breakfast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una asistencia de desayuno por ID
export const updateBreakfastAttendanceById = async (req, res) => {
    try {
        const { date, partner_id, attendance } = req.body;
        if (!date && !partner_id && attendance === undefined) {
            return res.status(400).json({ message: 'Al menos uno de los campos debe ser proporcionado: date, partner_id, attendance' });
        }

        const updatedBreakfast = await BreakfastModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBreakfast) {
            return res.status(404).json({ message: 'Asistencia de desayuno no encontrada' });
        }
        res.status(200).json(updatedBreakfast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una asistencia de desayuno por ID
export const deleteBreakfastAttendanceById = async (req, res) => {
    try {
        const deletedBreakfast = await BreakfastModel.findByIdAndDelete(req.params.id);
        if (!deletedBreakfast) {
            return res.status(404).json({ message: 'Asistencia de desayuno no encontrada' });
        }
        res.status(200).json({ message: 'Asistencia de desayuno eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
