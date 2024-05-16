import express from 'express';
import {createStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById}  from '../controllers/StudentController.js';

const router = express.Router();

// Rutas para los estudiantes
router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudentById);
router.delete('/students/:id',deleteStudentById);

export default router;
