import express from 'express';
import scheduleDaysController from '../controllers/ScheduleDaysController.js';

const router = express.Router();

router.post('/scheduleDays', scheduleDaysController.createScheduleDay); // POST route
router.get('/scheduleDays', scheduleDaysController.getAllScheduleDays); // GET all route
router.get('/scheduleDays/:id', scheduleDaysController.getScheduleDayById); // GET by ID route
router.put('/scheduleDays/:id', scheduleDaysController.updateScheduleDayById); // PUT route
router.delete('/scheduleDays/:id', scheduleDaysController.deleteScheduleDayById); // DELETE route

export default router;