import { Router } from "express";
import { validateFields } from '../middlewares/validate-fields.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { addToCart } from './shoppingCart.controller.js';
import { finalizePurchase } from './shoppingCart.controller.js';


const router = Router();

router.post(
    "/add-to-cart",
    [
        validarJWT,
        validateFields,
    ],
    addToCart
);

router.post(
    '/finalize-purchase',
    [ 
        validarJWT, 
        validateFields,
    ],
    finalizePurchase    
);


export default router;
