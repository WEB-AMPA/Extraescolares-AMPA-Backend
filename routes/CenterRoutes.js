import { Router } from 'express';
import { createCenter, getCenterById, updateCenter, deleteCenter, getAllCenters } from '../controllers/CenterController.js';

const router = Router();

// Ruta para crear un nuevo centro
router.post('/center', async (req, res) => {
    try {
        const centerData = req.body;
        const newCenter = await createCenter(centerData);
        res.json(newCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un centro por su ID
router.get('/center/:id', async (req, res) => {
    try {
        const centerId = req.params.id;
        const center = await getCenterById(centerId);
        res.json(center);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar un centro por su ID
router.put('/center/:id', async (req, res) => {
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
router.delete('/center/:id', async (req, res) => {
    try {
        const centerId = req.params.id;
        const deletedCenter = await deleteCenter(centerId);
        res.json(deletedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener todos los centros
router.get('/centers', getAllCenters);


export default router;