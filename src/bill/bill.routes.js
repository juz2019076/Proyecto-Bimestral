import express from 'express';
import { crearFactura } from './bill.controller.js';

const router = express.Router();

router.post('/', crearFactura);

export default router;
