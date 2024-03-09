import Factura from './bill.model.js';


export const crearFactura = async (req, res) => {
    try {
        const { cliente, productos } = req.body;
        const nuevaFactura = await Factura.create({
            cliente: cliente,
            productos: productos
        });

        res.status(201).json({ factura: nuevaFactura });
    } catch (error) {
        console.error('Error al crear la factura:', error);
        res.status(500).json({ error: 'Error al crear la factura' });
    }
};
