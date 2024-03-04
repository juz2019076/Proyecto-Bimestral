import express from 'express';
import categoryController from '../administrator/categoryController.js';

const router = express.Router();

// Rutas para categorías
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
