import express from 'express';
import { createPartner, getPartners, getPartnerById, updatePartnerById, deletePartnerById } from '../controllers/PartnerController.js';

const router = express.Router();

router.post('/partners', createPartner);

router.get('/partners', getPartners);

router.get('/partners/:id', getPartnerById);

router.put('/partners/:id', updatePartnerById);

router.delete('/partners/:id', deletePartnerById);

export default router;
