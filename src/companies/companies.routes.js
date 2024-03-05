import express from 'express';
const router = express.Router();

// Importar controladores y funciones de las empresas
import { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from '../companies/company.controller.js';

// Definir rutas para las empresas
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;
