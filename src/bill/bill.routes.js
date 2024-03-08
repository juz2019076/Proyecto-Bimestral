import {
    agregarProductoAFactura,
    generarFactura,
    reiniciarFactura,
    establecerCliente
} from './bill.controller.js';

router.post(
    "/factura",
    [
        validarJWT,
        validateFields,
    ],
    (req, res) => {
        const { cliente, productos } = req.body;

        establecerCliente(cliente);

        productos.forEach(producto => {
            agregarProductoAFactura(producto);
        });

        const facturaGenerada = generarFactura();

        reiniciarFactura();

        res.json({
            factura: facturaGenerada
        });
    }
);