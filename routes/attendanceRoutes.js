import express from 'express';
import { registerAttendance, getAttendancesByStudentAndDateRange, updateAttendance, getAllAttendances, deleteAttendance } from '../controllers/AttendanceController.js';

const router = express.Router();

// Ruta para registrar la asistencia a una actividad
router.post('/registerAttendance', registerAttendance);

// Ruta para obtener la asistencia de un estudiante en un rango de fechas
router.get('/attendance/:student_id/', getAttendancesByStudentAndDateRange);


// Ruta para obtener todas las asistencias
router.get('/attendance', getAllAttendances);

// Ruta para actualizar la asistencia
router.put('/attendances/:attendance_id', updateAttendance);

// Ruta para eliminar la asistencia
router.delete('/attendances/:attendance_id', deleteAttendance);


// Ruta para eliminar una asistencia
router.delete('/:attendance_id', deleteAttendance);

export default router;