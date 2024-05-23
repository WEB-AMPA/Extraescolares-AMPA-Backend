import express from 'express';
import { registerAttendance, getAttendancesByStudentAndDateRange, updateAttendance, getAllAttendances } from '../controllers/AttendanceController.js';

const router = express.Router();

// Ruta para registrar la asistencia a una actividad
router.post('/register', registerAttendance);

// Ruta para obtener la asistencia de un estudiante en un rango de fechas
router.get('/attendance/:student_id/', getAttendancesByStudentAndDateRange);


// Ruta para obtener todas las asistencias
router.get('/attendance', getAllAttendances);

// Ruta para actualizar la asistencia de un estudiante en una fecha específica
router.put('/:attendance_id', updateAttendance);

export default router;