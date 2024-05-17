// partnerRoutes.js
import express from 'express';
import { createPartner, getPartners, getPartnerById, updatePartnerById, deletePartnerById } from '../controllers/PartnerController.js';

const router = express.Router();

// Ruta para crear un nuevo socio
router.post('/partners', createPartner);

// Ruta para obtener todos los socios
router.get('/partners', getPartners);

// Ruta para obtener un socio por su ID
router.get('/partners/:id', getPartnerById);

// Ruta para actualizar un socio
router.put('/partners/:id', updatePartnerById);

// Ruta para eliminar un socio
router.delete('/partners/:id', deletePartnerById);

export default router;
