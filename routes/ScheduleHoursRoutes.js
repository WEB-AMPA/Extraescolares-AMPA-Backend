import express from 'express';
import scheduleHoursController from '../controllers/ScheduleHoursController.js';

const router = express.Router();

router.post('/schedule-hours', scheduleHoursController.createScheduleHour); 
router.get('/schedule-hours', scheduleHoursController.getAllScheduleHours); 
router.get('/schedule-hours/:id', scheduleHoursController.getScheduleHourById); 
router.put('/schedule-hours/:id', scheduleHoursController.updateScheduleHour); 
router.delete('/schedule-hours/:id', scheduleHoursController.deleteScheduleHour); 

export default router;