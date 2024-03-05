import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
},
  quantity: { 
    type: Number, 
    required: true 
},
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
