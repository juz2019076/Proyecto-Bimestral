import Order from '../customer/orderModel.js';

const historyController = {
  async getPurchaseHistory(req, res) {
    try {
      const orders = await Order.find({ user: req.user._id }).populate('items.product');
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default historyController;
