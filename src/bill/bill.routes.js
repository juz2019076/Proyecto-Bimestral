import { Router } from "express";
import { validateFields } from '../middlewares/validate-fields.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { 
    getInvoicesByUser, 
    getInvoiceDetails,
} from './bill.controller.js';

const router = Router();

router.post(
    '/invoices/by-user', 
    getInvoicesByUser
);

router.get(
    "/details/:invoiceId",
    [
        validarJWT,
        validateFields,
    ],
    getInvoiceDetails
);

export default router;
