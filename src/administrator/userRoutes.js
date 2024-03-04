import express from 'express';
import userController from '../administrator/userController.js';

const router = express.Router();

// Rutas para usuarios
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
