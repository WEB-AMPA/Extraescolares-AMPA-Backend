import express from 'express';
import {
    createBreakfastAttendance,
    getAllBreakfastAttendances,
    getBreakfastAttendanceById,
    updateBreakfastAttendanceById,
    deleteBreakfastAttendanceById
} from '../controllers/BreakfastController.js';

const router = express.Router();

// Rutas para gestionar asistencias de desayunos
router.post('/breakfast-attendance', createBreakfastAttendance); // Crear una nueva asistencia de desayuno
router.get('/breakfast-attendance', getAllBreakfastAttendances); // Obtener todas las asistencias de desayuno
router.get('/breakfast-attendance/:id', getBreakfastAttendanceById); // Obtener una asistencia de desayuno por ID
router.put('/breakfast-attendance/:id', updateBreakfastAttendanceById); // Actualizar una asistencia de desayuno por ID
router.delete('/breakfast-attendance/:id', deleteBreakfastAttendanceById); // Eliminar una asistencia de desayuno por ID

export default router;
