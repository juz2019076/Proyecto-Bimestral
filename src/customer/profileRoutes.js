import express from 'express';
import profileController from '../customer/profileController.js';

const router = express.Router();

// Rutas para la gestión de perfil
router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);
router.delete('/', profileController.deleteAccount); // Ruta para eliminar la cuenta

export default router;
