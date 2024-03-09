import Factura from './bill.model.js';

export const crearFactura = async (req, res) => {
    try {
        const { user, total, productos } = req.body;
        
        // Verificamos si los datos necesarios están presentes
        if (!user || !total || !productos || productos.length === 0) {
            return res.status(400).json({ error: 'Los datos de la factura son inválidos' });
        }

        // Creamos la nueva factura
        const nuevaFactura = await Factura.create({
            user: user,
            products: productos,
            total: total
        });

        res.status(201).json({ factura: nuevaFactura });
    } catch (error) {
        console.error('Error al crear la factura:', error);
        res.status(500).json({ error: 'Error al crear la factura' });
    }
};
