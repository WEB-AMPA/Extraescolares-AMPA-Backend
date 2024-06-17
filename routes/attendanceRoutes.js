import express from 'express';
import {
    registerAttendance,
    getAllAttendances,
    updateAttendance,
    getStudentsAndAttendanceByActivityAndDate,
    getAttendanceByActivitiesStudentInDateRange,
    getAttendanceByStudentAndActivity} from '../controllers/AttendanceController.js';

const router = express.Router();

router.post('/registerAttendance', registerAttendance);
router.get('/student/:studentId/activity/:activityId/dateRange/:startDate/:endDate', getAttendanceByStudentAndActivity);
router.get('/activitiesStudents/by-activity-and-date/:activity_id/:date', getStudentsAndAttendanceByActivityAndDate);

router.get('/activities_student/:activities_student_id/date-range/:start_date/:end_date', getAttendanceByActivitiesStudentInDateRange);


// Ruta para obtener todas las asistencias
router.get('/', getAllAttendances);


// Ruta para actualizar la asistencia
router.put('/:attendance_id', updateAttendance);


export default router;