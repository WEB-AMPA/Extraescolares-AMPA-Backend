import express from 'express';
import categoriesController from '../controllers/CategoriesController.js';

const router = express.Router();

router.post('/', categoriesController.createCategory);
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.get('/name/:name', categoriesController.getCategoryByName);
router.put('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export default router;

