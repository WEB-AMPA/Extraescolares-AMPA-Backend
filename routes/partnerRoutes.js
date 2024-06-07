import express from 'express';
import { createPartner, getPartners, getPartnerById, updatePartnerById, deletePartnerById } from '../controllers/PartnerController.js';

const router = express.Router();

router.post('/', createPartner);
router.get('/', getPartners);
router.get('/:id', getPartnerById);
router.put('/:id', updatePartnerById);
router.delete('/:id', deletePartnerById);

export default router;

