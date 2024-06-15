import express from 'express';
import centersController from '../controllers/CentersController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// // Crear un nuevo centro (solo accesible por admin)
// router.post('/', authenticate, authorize(['admin']), centersController.createCenter);

// // Obtener todos los centros (accesible por admin)
// router.get('/', authenticate, authorize(['admin']), centersController.getAllCenters);

// // Obtener un centro por su ID (accesible por admin)
// router.get('/:id', authenticate, authorize(['admin']), centersController.getCenterById);

// // Actualizar un centro por su ID (solo accesible por admin)
// router.put('/:id', authenticate, authorize(['admin']), centersController.updateCenter);

// // Eliminar un centro por su ID (solo accesible por admin)
// router.delete('/:id', authenticate, authorize(['admin']), centersController.deleteCenter);



// Obtener todos los centros (accesible por admin)
router.get('/',  centersController.getAllCenters);

// Obtener un centro por su ID (accesible por admin)
router.get('/:id', centersController.getCenterById);



export default router;
