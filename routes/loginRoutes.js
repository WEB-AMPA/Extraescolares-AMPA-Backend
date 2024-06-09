import express from 'express';
import { loginUser } from '../controllers/LoginController.js';

const router = express.Router();

// Ruta para crear un nuevo socio
router.post('/', loginUser);



export default router;
