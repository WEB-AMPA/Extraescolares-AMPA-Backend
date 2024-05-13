import express from 'express';
import * as categoryController from '../controllers/CategoryController.js';

const router = express.Router();

// Ruta para crear una nueva categoría
router.post('/categories', async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await categoryController.createCategory(categoryData);
        res.json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener una categoría por su ID
router.get('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryController.getCategoryById(categoryId);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar una categoría por su ID
router.put('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const newData = req.body;
        const updatedCategory = await categoryController.updateCategory(categoryId, newData);
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar una categoría por su ID
router.delete('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoryController.deleteCategory(categoryId);
        res.json(deletedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;