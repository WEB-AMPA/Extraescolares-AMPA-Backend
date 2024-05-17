import RateModel from '../models/RateModel.js';

// Crear una nueva tarifa de desayuno
export const createBreakfastRate = async (req, res) => {
    try {
        const newBreakfastRate = new RateModel(req.body);
        const savedBreakfastRate = await newBreakfastRate.save();
        res.status(201).json(savedBreakfastRate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las tarifas de desayuno
export const getAllBreakfastRates = async (req, res) => {
    try {
        const breakfastRates = await RateModel.find();
        res.status(200).json(breakfastRates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
