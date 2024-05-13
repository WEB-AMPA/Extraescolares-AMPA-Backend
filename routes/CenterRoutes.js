const express = require('express');
const centerController = require('../controllers/CenterController.js');

const router = express.Router();

// Ruta para crear un nuevo centro
router.post('/centers', async (req, res) => {
    try {
        const centerData = req.body;
        const newCenter = await centerController.createCenter(centerData);
        res.json(newCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un centro por su ID
router.get('/centers/:id', async (req, res) => {
    try {
        const centerId = req.params.id;
        const center = await centerController.getCenterById(centerId);
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
        const updatedCenter = await centerController.updateCenter(centerId, newData);
        res.json(updatedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un centro por su ID
router.delete('/centers/:id', async (req, res) => {
    try {
        const centerId = req.params.id;
        const deletedCenter = await centerController.deleteCenter(centerId);
        res.json(deletedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;