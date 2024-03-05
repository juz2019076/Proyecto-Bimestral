import express from 'express';
import authController from '../auth/auth.controller.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', authController.login);

export default router;
