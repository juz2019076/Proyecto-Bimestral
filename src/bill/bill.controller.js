let factura = {
    cliente: '',
    detalles: [],
    total: 0
};

export const agregarProductoAFactura = (producto) => {
    factura.detalles.push(producto);
    factura.total += producto.precio * producto.cantidad;
};

export const establecerCliente = (nombreCliente) => {
    factura.cliente = nombreCliente;
};

export const obtenerDetallesFactura = () => {
    return factura.detalles;
};

export const calcularTotalFactura = () => {
    return factura.total;
};

export const generarFactura = () => {
    return {
        cliente: factura.cliente,
        detalles: obtenerDetallesFactura(),
        total: calcularTotalFactura()
    };
};

export const reiniciarFactura = () => {
    factura = {
        cliente: '',
        detalles: [],
        total: 0
    };
};