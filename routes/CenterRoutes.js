import express from 'express';
import centersController from '../controllers/CentersController.js';

const router = express.Router();

router.post('/centers', centersController.createCenter);
router.get('/centers', centersController.getAllCenters);
router.get('/centers/:id', centersController.getCenterById);
router.put('/centers/:id', centersController.updateCenter);
router.delete('/centers/:id', centersController.deleteCenter);

export default router;