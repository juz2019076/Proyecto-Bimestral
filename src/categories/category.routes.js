import { Router } from "express";
import { check } from "express-validator";
import {
    categoryDelete,
    categoryPost,
    categoryPut,
    categoryGet
} from "./category.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("name", "The name is required"),
        check("description", "Description is mandatory"),
        validateFields,
    ],
    categoryPost
);

router.put(
    "/:id",
    [
        validarJWT,
        check("name", "The name is required"),
        check("description", "Description is mandatory"),
        validateFields,
    ],
    categoryPut
);

router.get(
    "/",
    [
        validateFields,
    ],
    categoryGet
);

router.delete(
    "/:id",
    [
        validarJWT,
        validateFields,
    ],
    categoryDelete
);

export default router;