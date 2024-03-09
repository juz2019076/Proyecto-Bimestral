import ShoppingCart from './shoppingCart.model.js';
import Product from '../products/product.model.js';
import { generateInvoice } from '../bill/bill.controller.js';

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { productId, quantity } = req.body;

        let shoppingCart = await ShoppingCart.findOne({ userId });
        if (!shoppingCart) {
            shoppingCart = new ShoppingCart({
                userId,
                products: []
            });
        }

        shoppingCart.products.push({ productId, quantity });

        await shoppingCart.save();

        res.status(200).json({
            message: 'Product added to cart successfully',
            productId,
            quantity
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const finalizePurchase = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { products, total } = req.body;

        let shoppingCart = await ShoppingCart.findOne({ userId });
        if (!shoppingCart) {
            return res.status(400).json({ error: 'Shopping cart not found for this user' });
        }

        const invoice = await generateInvoice(userId, products, total);

        shoppingCart.products = [];
        await shoppingCart.save();

        res.status(200).json({ message: 'Purchase completed successfully', invoice });
    } catch (error) {
        console.error('Error finalizing purchase:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
