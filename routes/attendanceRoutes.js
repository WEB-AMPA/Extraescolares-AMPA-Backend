import express from 'express';
import { registerAttendance, getAttendanceByStudent, updateAttendance } from '../controllers/AttendanceController.js';

const router = express.Router();

// Ruta para registrar la asistencia a una actividad
router.post('/', registerAttendance);

// Ruta para obtener la asistencia de un estudiante en un rango de fechas
router.get('/:student_id/:start_date/:end_date', getAttendanceByStudent);

// Ruta para actualizar la asistencia de un estudiante en una fecha específica
router.put('/:attendance_id', updateAttendance);

export default router;
