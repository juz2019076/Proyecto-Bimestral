import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    total: {
        type: Number,
        required: true
    }
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
