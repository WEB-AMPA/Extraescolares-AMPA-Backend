import express from 'express';
import activitiesStudentsController from '../controllers/ActivitiesStudentsController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), activitiesStudentsController.getAllAssignments);
router.get('/by-activity/:activityId', authenticate, authorize(['admin']), activitiesStudentsController.getStudentsByActivity);
router.get('/:id', authenticate, authorize(['admin']), activitiesStudentsController.getAssignmentById);
router.post('/', authenticate, authorize(['admin']), activitiesStudentsController.createAssignment);
router.put('/:id', authenticate, authorize(['admin']), activitiesStudentsController.updateAssignment);
router.delete('/:id', authenticate, authorize(['admin']), activitiesStudentsController.deleteAssignment);

export default router;
