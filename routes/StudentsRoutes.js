import express from 'express';
import studentsController from '../controllers/StudentController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), studentsController.createStudent);
router.get('/', authenticate, authorize(['admin']), studentsController.getAllStudents);
router.get('/withbreakfast', authenticate, authorize(['admin', 'coordinator']), studentsController.getStudentsWithBreakfast);
router.get('/:id', authenticate, authorize(['admin']), studentsController.getStudentById);
router.put('/:id', authenticate, authorize(['admin']), studentsController.updateStudent);
router.delete('/:id', authenticate, authorize(['admin']), studentsController.deleteStudent);
router.get('/partner/:partnerId', authenticate, authorize(['admin','partner']), studentsController.getStudentsByPartnerId);

export default router;
