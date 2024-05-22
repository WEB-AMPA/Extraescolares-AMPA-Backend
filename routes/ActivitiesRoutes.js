import express from 'express';
import activitiesController from '../controllers/ActivitiesController.js';

const router = express.Router();

router.post('/', activitiesController.createActivity);
router.get('/', activitiesController.getAllActivities);
router.get('/:id', activitiesController.getActivityById);
router.put('/:id', activitiesController.updateActivityDetails);
router.delete('/:id', activitiesController.deleteActivity);
router.post('/assign', activitiesController.assignActivityToStudent); 

export default router;