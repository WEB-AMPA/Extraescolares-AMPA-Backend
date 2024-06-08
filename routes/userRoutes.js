import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById, getUsersByRole } from '../controllers/UsersController.js';

const router = express.Router();

// Ruta para crear un usuario
router.post('/', createUser);
// Ruta para obtener todos los usuarios
router.get('/', getUsers);
// Ruta para obtener usuarios por rol
router.get('/role/:roleName', getUsersByRole);
// Ruta para obtener un usuario por su ID
router.get('/:id', getUserById);
// Ruta para actualizar un usuario por su ID
router.put('/:id', updateUserById);
// Ruta para eliminar un usuario por su ID
router.delete('/:id', deleteUserById);

export default router;

