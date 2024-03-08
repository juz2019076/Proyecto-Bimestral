import { Router } from "express";
import { check } from "express-validator";
import {
     productPost,
     productDelete,
     productPut,
     productGet
} from './product.controller.js';
import { 
    shoppingCartPost,
    obtain
 } from '../shoppingCart/shoppingCart.controller.js';
import { validateFields } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("name","The name is required"),
        check("description","The description is mandatory"),
        check("price","The price is mandatory"),
        check("stock","Existence is necessary"),
        validateFields,
    ],
    productPost
);

router.delete(
    "/:productId",
    [
        validarJWT,
        validateFields,
    ],
    productDelete
);

router.put(
    "/:productId",
    [
        validarJWT,
        validateFields,
    ],
    productPut
);

router.get(
    "/",
    [
        validateFields,
    ],
    productGet
);

router.post(
    "/shoppingCart/:productId",
    [
        validarJWT,
        validateFields,
    ],
    (req, res) => {
        const {
            productId
        } = req.params;
        const {
            amount
        } = req.body;

        shoppingCartPost(productId, amount);

        res.json({
            shoppingCart: obtain()
        });
    }
);

export default router;