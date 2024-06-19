import express from 'express';
import scheduleHoursController from '../controllers/ScheduleHoursController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), scheduleHoursController.createScheduleHour);
router.get('/', authenticate, authorize(['admin']), scheduleHoursController.getAllScheduleHours);
router.get('/:id', authenticate, authorize(['admin']), scheduleHoursController.getScheduleHourById);
router.put('/:id', authenticate, authorize(['admin']), scheduleHoursController.updateScheduleHour);
router.delete('/:id', authenticate, authorize(['admin']), scheduleHoursController.deleteScheduleHour);

export default router;
