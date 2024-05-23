import express from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
} from '../controllers/RoleController.js';  // Ajusta la ruta según la ubicación de tu controlador

const router = express.Router();

router.post('/roles', createRole);
router.get('/roles', getRoles);
router.get('/roles/:id', getRoleById);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

export default router;
