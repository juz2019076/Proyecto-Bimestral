import mongoose, { Schema } from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is mandatory'],
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'The product is required']
    }],
    state: {
        type: Boolean,
        default: true,
    },
    defaultCategory: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model('Category', CategorySchema);
