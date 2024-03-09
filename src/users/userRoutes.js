import { Router } from "express";
import { check } from "express-validator";
import { 
    usersPost,
    userPut,
    usersDelete
} from './userController.js';
import {
    existsEmail,
} from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "The name is required").not().isEmpty(),
        check("password", "The password must be greater than 6 characters").isLength({
          min: 6,
        }),
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(existsEmail),
        check("role"),
        validateFields,
    ],
    usersPost
);

router.put(
    "/:id",
    [
        validarJWT,
        check("name", "The name is required"),
        check("role", "Role is mandatory"),
        validateFields,
    ],
    userPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        validateFields,
    ],
    usersDelete
);

export default router;