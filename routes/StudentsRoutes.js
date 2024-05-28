import express from 'express';
import studentsController from '../controllers/StudentController.js';

const router = express.Router();

router.post('/', studentsController.createStudent);
router.get('/', studentsController.getAllStudents);
router.get('/withbreakfast', studentsController.getStudentsWithBreakfast);
router.get('/:id', studentsController.getStudentById);
router.put('/:id', studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);


export default router;

