// partnerRoutes.js
import express from 'express';
import { createPartner, getAllPartners, getPartnerById, updatePartner, deletePartner } from '../controllers/PartnerController.js';

const router = express.Router();

// Ruta para crear un nuevo socio
router.post('/partners', createPartner);

// Ruta para obtener todos los socios
router.get('/partners', getAllPartners);

// Ruta para obtener un socio por su ID
router.get('/partners/:id', getPartnerById);

// Ruta para actualizar un socio
router.put('/partners/:id', updatePartner);

// Ruta para eliminar un socio
router.delete('/partners/:id', deletePartner);

export default router;
