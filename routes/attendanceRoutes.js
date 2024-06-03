import express from 'express';
<<<<<<< HEAD
import { registerAttendance, getAttendanceByStudent, updateAttendance, deleteAttendance } from '../controllers/AttendanceController.js';

const router = express.Router();

// Ruta para registrar la asistencia
router.post('/attendances', registerAttendance);

// Ruta para obtener la asistencia de un estudiante en un rango de fechas
router.get('/attendances/:activities_students/:start_date/:end_date', getAttendanceByStudent);
=======
import { registerAttendance, getAttendanceByStudent, updateAttendance, getAllAttendances } from '../controllers/AttendanceController.js';

const router = express.Router();

// Ruta para registrar la asistencia a una actividad
router.post('/register', registerAttendance);

// Ruta para obtener la asistencia de un estudiante en un rango de fechas
router.get('/student/:student_id/from/:start_date/to/:end_date', getAttendanceByStudent);


// Ruta para obtener todas las asistencias
router.get('/attendance', getAllAttendances);
>>>>>>> 81b052180ef2b3b47145bf9e5be7106c1082b186

// Ruta para actualizar la asistencia
router.put('/attendances/:attendance_id', updateAttendance);

// Ruta para eliminar la asistencia
router.delete('/attendances/:attendance_id', deleteAttendance);

export default router;