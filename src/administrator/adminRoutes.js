import express from 'express';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const router = express.Router();

// Rutas protegidas que requieren autorización del administrador
router.get('/protected', verifyAdminToken, (req, res) => {
  res.status(200).json({ message: 'Admin access granted' });
});

export default router;
