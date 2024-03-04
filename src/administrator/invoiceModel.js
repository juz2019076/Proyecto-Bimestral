import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  products: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
}],
  total: { type: Number, 
    required: true 
},
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
