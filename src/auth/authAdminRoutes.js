import express from 'express';
import authAdminController from '../auth/authAdminController.js';

const router = express.Router();

// Ruta para iniciar sesión del administrador
router.post('/login', authAdminController.login);

export default router;
