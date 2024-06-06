import express from 'express';
import {
    registerAttendance,
    getAttendancesByStudentAndDateRange,
    getAttendancesByActivity,
    getAllAttendances,
    updateAttendance,
    getStudentsAndAttendanceByActivityAndDate,
    getAttendanceByStudentAndActivityInDateRange,
    getAttendanceByActivitiesStudentInDateRange,
    // getStudentAttendanceForActivityAndDateRange,
    getAttendanceByStudentAndActivity} from '../controllers/AttendanceController.js';

const router = express.Router();

// Ruta para registrar la asistencia a una actividad
router.post('/registerAttendance', registerAttendance);

// Ruta para obtener la asistencia de un estudiante en un rango de fechas
router.get('/attendance/:student_id/', getAttendancesByStudentAndDateRange);

// Ruta para obtener la asistencia de un estudiante para una actividad específica en un rango de fechas
router.get('/attendance/student/:studentId/activity/:activityId/dateRange/:startDate/:endDate', getAttendanceByStudentAndActivity);





// Ruta para obtener para obtener estudiantes y su asistencia por actividad y fecha
router.get('/activitiesStudents/by-activity-and-date/:activity_id/:date', getStudentsAndAttendanceByActivityAndDate);

// Ruta para obtener para obtener estudiantes y su asistencia por actividad y fecha
router.get('/attendance/student/:student_id/activity/:activity_id/date-range/:start_date/:end_date', getAttendanceByStudentAndActivityInDateRange);

// Ruta para obtener la asistencia por activities_student y rango de fechas
router.get('/attendance/activities_student/:activities_student_id/date-range/:start_date/:end_date', getAttendanceByActivitiesStudentInDateRange);


// Ruta para obtener todas las asistencias
router.get('/attendance', getAllAttendances);

// Ruta para obtener Asistencia por Actividad
router.get('/attendance/activity/:activity_id', getAttendancesByActivity);

// Ruta para actualizar la asistencia
router.put('/attendances/:attendance_id', updateAttendance);


export default router;