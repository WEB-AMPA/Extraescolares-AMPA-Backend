import express from 'express';
import { createBreakfastRate, getAllBreakfastRates } from '../controllers/RateController.js';

const router = express.Router();

// Ruta para crear una nueva tarifa de desayuno
router.post('/', createBreakfastRate);

// Ruta para obtener todas las tarifas de desayuno
router.get('/', getAllBreakfastRates);

export default router;
