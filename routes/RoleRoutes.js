import express from 'express';
import {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole
} from '../controllers/RoleController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Crear un nuevo rol (solo accesible por admin)
router.post('/roles', authenticate, authorize(['admin']), createRole);

// Obtener todos los roles (solo accesible por admin)
router.get('/roles', authenticate, authorize(['admin']), getRoles);

// Obtener un rol por ID (solo accesible por admin)
router.get('/roles/:id', authenticate, authorize(['admin']), getRoleById);

// Actualizar un rol por ID (solo accesible por admin)
router.put('/roles/:id', authenticate, authorize(['admin']), updateRole);

// Eliminar un rol por ID (solo accesible por admin)
router.delete('/roles/:id', authenticate, authorize(['admin']), deleteRole);

export default router;
