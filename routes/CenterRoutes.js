import express from 'express';
import centersController from '../controllers/CentersController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), centersController.createCenter);
router.get('/', authenticate, authorize(['admin']), centersController.getAllCenters);
router.get('/:id', authenticate, authorize(['admin']), centersController.getCenterById);
router.put('/:id', authenticate, authorize(['admin']), centersController.updateCenter);
router.delete('/:id', authenticate, authorize(['admin']), centersController.deleteCenter);


export default router;
