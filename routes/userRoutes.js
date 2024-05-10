import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/UsersController.js';

const router = express.Router();


// Ruta para crear todos los usuarios
router.post('/users', createUser);
// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Ruta para obtener un usuario por su ID
router.get('/users/:id', getUserById);

// Ruta para actualizar un usuario por su ID
router.put('/users/:id', updateUserById);

// Ruta para eliminar un usuario por su ID
router.delete('/users/:id', deleteUserById);

export default router;
