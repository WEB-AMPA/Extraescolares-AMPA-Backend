import express from 'express';
import activitiesController from '../controllers/ActivitiesController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';


const router = express.Router();

// router.post('/', authenticate, authorize(['admin']), activitiesController.createActivity);
// // router.get('/', authenticate, authorize(['admin']), activitiesController.getAllActivities);
// // router.get('/:id', authenticate, authorize(['admin']), activitiesController.getActivityById);
// router.put('/:id', authenticate, authorize(['admin']), activitiesController.updateActivity);
// router.delete('/:id', authenticate, authorize(['admin']), activitiesController.deleteActivity);
// router.post('/assign', authenticate, authorize(['admin']), activitiesController.assignActivityToStudent);




router.post('/', activitiesController.createActivity);
router.get('/',  activitiesController.getAllActivities);
router.get('/:id',  activitiesController.getActivityById);
router.put('/:id', activitiesController.updateActivity);
router.delete('/:id',  activitiesController.deleteActivity);
router.post('/assign', activitiesController.assignActivityToStudent);
router.put('/:id/update-monitor', activitiesController.updateMonitorOfActivity);



export default router;


