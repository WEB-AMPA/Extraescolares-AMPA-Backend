import express from 'express';
import { createBreakfast, getAllBreakfasts, getBreakfastById, updateBreakfastById, deleteBreakfastById } from '../controllers/BreakfastController.js';

const router = express.Router();

// Rutas para el CRUD de desayunos
router.post('/breakfasts', createBreakfast);
router.get('/breakfasts', getAllBreakfasts);
router.get('/breakfasts/:id', getBreakfastById);
router.put('/breakfasts/:id', updateBreakfastById);
router.delete('/breakfasts/:id', deleteBreakfastById);

export default router;
