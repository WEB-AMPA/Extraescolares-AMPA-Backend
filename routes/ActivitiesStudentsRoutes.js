import express from 'express';
import activitiesStudentsController from '../controllers/ActivitiesStudentsController.js';

const router = express.Router();

router.get('/', activitiesStudentsController.getAllAssignments);
router.get('/by-activity/:activityId', activitiesStudentsController.getStudentsByActivity);
router.get('/:id', activitiesStudentsController.getAssignmentById);
router.post('/', activitiesStudentsController.createAssignment);
router.put('/:id', activitiesStudentsController.updateAssignment);
router.delete('/:id', activitiesStudentsController.deleteAssignment);

export default router;
