import express from 'express';
import studentsController from '../controllers/StudentController.js';

const router = express.Router();

router.post('/', studentsController.createStudent);
router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getStudentById);
router.put('/:id', studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);
router.get('/withbreakfast', studentsController.getStudentsWithBreakfast);


export default router;

