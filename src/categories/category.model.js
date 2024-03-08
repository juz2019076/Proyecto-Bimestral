import mongoose, { Schema } from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'The name is required'],
    },
    description: {
        type: String,
        require: [true, 'Description is mandatory'],
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: [true, 'The product is required']
    }],
    state: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Category', CategorySchema);