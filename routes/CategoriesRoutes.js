import express from 'express';
import categoriesController from '../controllers/CategoriesController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
import { validateCategory } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), validateCategory, categoriesController.createCategory);
router.get('/', authenticate, authorize(['admin']), categoriesController.getAllCategories);
router.get('/:id', authenticate, authorize(['admin']), categoriesController.getCategoryById);
router.get('/name/:name', authenticate, authorize(['admin']), categoriesController.getCategoryByName);
router.put('/:id', authenticate, authorize(['admin']), validateCategory, categoriesController.updateCategory);
router.delete('/:id', authenticate, authorize(['admin']), categoriesController.deleteCategory);

export default router;

