import { Router } from 'express';
import { createCenter, getCenterById, updateCenter, deleteCenter } from '../controllers/CenterController.js';

const router = Router();

// Ruta para crear un nuevo centro
router.post('/centers', async (req, res) => {
    try {
        const centerData = req.body;
        const newCenter = await createCenter(centerData);
        res.json(newCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un centro por su ID
router.get('/centers/:id', async (req, res) => {
    try {
        const centerId = req.params.id;
        const center = await getCenterById(centerId);
        res.json(center);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar un centro por su ID
router.put('/centers/:id', async (req, res) => {
    try {
        const centerId = req.params.id;
        const newData = req.body;
        const updatedCenter = await updateCenter(centerId, newData);
        res.json(updatedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un centro por su ID
router.delete('/centers/:id', async (req, res) => {
    try {
        const centerId = req.params.id;
        const deletedCenter = await deleteCenter(centerId);
        res.json(deletedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;