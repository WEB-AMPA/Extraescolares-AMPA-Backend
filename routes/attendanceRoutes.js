import express from 'express';
import { registerAttendance, getAttendanceByStudent, updateAttendance, deleteAttendance } from '../controllers/AttendanceController.js';

const router = express.Router();

// Ruta para registrar la asistencia
router.post('/attendances', registerAttendance);

// Ruta para obtener la asistencia de un estudiante en un rango de fechas
router.get('/attendances/:activities_students/:start_date/:end_date', getAttendanceByStudent);

// Ruta para actualizar la asistencia
router.put('/attendances/:attendance_id', updateAttendance);

// Ruta para eliminar la asistencia
router.delete('/attendances/:attendance_id', deleteAttendance);

export default router;
