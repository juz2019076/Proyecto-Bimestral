import express from 'express';
import historyController from '../customer/historyController.js';

const router = express.Router();

// Ruta para obtener el historial de compras
router.get('/', historyController.getPurchaseHistory);

export default router;
