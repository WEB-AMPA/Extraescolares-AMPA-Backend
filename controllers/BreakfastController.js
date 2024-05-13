import BreakfastModel from '../models/BreakfastModel.js';

// Crear un nuevo desayuno
export const createBreakfast = async (req, res) => {
    try {
        const newBreakfast = new BreakfastModel(req.body);
        const savedBreakfast = await newBreakfast.save();
        res.status(201).json(savedBreakfast);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los desayunos
export const getAllBreakfasts = async (req, res) => {
    try {
        const breakfasts = await BreakfastModel.find();
        res.status(200).json(breakfasts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un desayuno por ID
export const getBreakfastById = async (req, res) => {
    try {
        const breakfast = await BreakfastModel.findById(req.params.id);
        if (!breakfast) {
            return res.status(404).json({ message: 'Registro del listado de desayuno no encontrado' });
        }
        res.status(200).json(breakfast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un desayuno por ID
export const updateBreakfastById = async (req, res) => {
    try {
        const updatedBreakfast = await BreakfastModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBreakfast) {
            return res.status(404).json({ message: 'Desayuno no encontrado' });
        }
        res.status(200).json(updatedBreakfast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un desayuno por ID
export const deleteBreakfastById = async (req, res) => {
    try {
        const deletedBreakfast = await BreakfastModel.findByIdAndDelete(req.params.id);
        if (!deletedBreakfast) {
            return res.status(404).json({ message: 'Registro de desayuno no encontrado' });
        }
        res.status(200).json({ message: 'Registro de desayuno eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
