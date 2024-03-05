import express from 'express';
import cartController from '../customer/cartController.js';

const router = express.Router();

// Rutas para el carrito de compras
router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update/:productId', cartController.updateCartItem);
router.delete('/remove/:productId', cartController.removeCartItem);
router.delete('/clear', cartController.clearCart);

export default router;
