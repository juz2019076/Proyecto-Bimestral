import Order from '../customer/orderModel.js.';
import Cart from '../customer/cartController.js';

const orderController = {
  async createOrder(req, res) {
    try {
      const cart = await Cart.getCart(req.user._id);

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      const order = await Order.create({ user: req.user._id, items: cart.items });

      // Limpiar el carrito después de completar la compra
      await Cart.clearCart(req.user._id);

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default orderController;
