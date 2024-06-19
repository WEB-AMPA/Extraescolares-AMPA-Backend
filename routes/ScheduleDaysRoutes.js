import express from 'express';
import scheduleDaysController from '../controllers/ScheduleDaysController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), scheduleDaysController.createScheduleDay);
router.get('/', authenticate, authorize(['admin']), scheduleDaysController.getAllScheduleDays);
router.get('/:id', authenticate, authorize(['admin']), scheduleDaysController.getScheduleDayById);
router.put('/:id', authenticate, authorize(['admin']), scheduleDaysController.updateScheduleDayById);
router.delete('/:id', authenticate, authorize(['admin']), scheduleDaysController.deleteScheduleDayById);

export default router;
