import express from 'express';
import {
    createBreakfastAttendance,
    getAllBreakfastAttendances,
    getBreakfastAttendanceById,
    updateBreakfastAttendanceById,
    deleteBreakfastAttendanceById,
    getBreakfastAttendancesByStudentAndDate,
    getBreakfastAttendancesByDate
} from '../controllers/BreakfastController.js';

const router = express.Router();

router.post('/breakfast-attendance', createBreakfastAttendance);
router.get('/breakfast-attendance', getAllBreakfastAttendances); 
router.get('/breakfast-attendance/date/:date', getBreakfastAttendancesByDate); 
router.get('/breakfast-attendance/:id', getBreakfastAttendanceById);
router.put('/breakfast-attendance/:id', updateBreakfastAttendanceById); 
router.delete('/breakfast-attendance/:id', deleteBreakfastAttendanceById); 
router.get('/breakfast-attendance/student/:student_id', getBreakfastAttendancesByStudentAndDate);
export default router;
