import express from 'express';
import { createActivity, getAllActivities, updateActivity, deleteActivity } from '../controllers/ActivityController.js';

const router = express.Router();

router.post('/activities', createActivity);
router.get('/activities', getAllActivities);
router.put('/activities/:id', updateActivity);
router.delete('/activities/:id', deleteActivity);

export default router;