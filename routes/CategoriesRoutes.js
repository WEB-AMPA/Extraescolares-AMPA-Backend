import express from 'express';
import categoriesController from '../controllers/CategoriesController.js';

const router = express.Router();

router.post('/categories', categoriesController.createCategory);
router.get('/categories', categoriesController.getAllCategories);
router.get('/categories/:id', categoriesController.getCategoryById);
router.put('/categories/:id', categoriesController.updateCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);

export default router;