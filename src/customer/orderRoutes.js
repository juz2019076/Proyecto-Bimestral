import express from 'express';
import orderController from '../customer/orderController.js';

const router = express.Router();

// Rutas para el proceso de compra
router.post('/create', orderController.createOrder);

export default router;
