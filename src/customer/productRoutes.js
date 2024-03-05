import express from 'express';
import productController from '../customer/productController.js';

const router = express.Router();

// Rutas para productos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

export default router;