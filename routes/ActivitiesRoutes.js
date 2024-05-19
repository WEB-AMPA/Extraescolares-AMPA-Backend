import express from 'express';
import activitiesController from '../controllers/ActivitiesController.js';

const router = express.Router();

router.post('/', activitiesController.createActivity);

export default router;
