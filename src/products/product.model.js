import mongoose, { Schema } from 'mongoose';

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'The name is required'],
    },
    description: {
        type: String,
        require: [true, 'The description is mandatory'],
    },
    price: {
        type: Number,
        require: [true, 'The price is mandatory'],
    },
    stock: {
        type: Number,
        require: [true, 'Existence is necessary'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        require: [false, 'What size do you need?'],
    },
    color: {
        type: String,
        require: [false, 'What color do you need?'],
    },
    gender: {
        type: String,
        require: [false, 'What gender do you need?'],
    },
    amount: {
        type: Number,
        require: [false, 'How much do you need'],
    },
});

export default mongoose.model('Product', ProductSchema);