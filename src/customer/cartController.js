import Cart from '../customer/cartModel.js';

const cartController = {
  async getCart(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async addToCart(req, res) {
    const { productId, quantity } = req.body;

    try {
      let cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
      }

      let cartItem = cart.items.find(item => item.product.equals(productId));

      if (cartItem) {
        cartItem.quantity += parseInt(quantity);
      } else {
        cart.items.push({ product: productId, quantity: parseInt(quantity) });
      }

      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateCartItem(req, res) {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
      const cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const cartItem = cart.items.find(item => item.product.equals(productId));

      if (!cartItem) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      cartItem.quantity = parseInt(quantity);

      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async removeCartItem(req, res) {
    const { productId } = req.params;

    try {
      const cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = cart.items.filter(item => !item.product.equals(productId));

      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async clearCart(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = [];

      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cartController;
