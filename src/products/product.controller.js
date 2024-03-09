import Product from './product.model.js';
import Category from '../categories/category.model.js';

export const productPost = async (req, res) => {
    const {categoryName, name, description, price, stock, size, color, gender, amount} = req.body;

    let searchCategory = await Category.findOne({ categoryName });

    if (!searchCategory) {
        return res.status(404).json({
            msg: 'The specified category does not exist',
        });
    }
    
    const product = new Product({ name, description, price, stock, size, color, gender, amount});
    await product.save();

    searchCategory.product.push(product._id);
    await searchCategory.save();

    res.status(200).json({
        product
    });
}

export const productDelete = async (req, res) => {
    const { productId } = req.params;
    
    try {
        const productDelete = await Product.findByIdAndDelete(productId);

        if (!productDelete) {
            return res.status(404).json({
                msg: 'Product not found',
            });
        }

        const category = await Category.findOne({ product: productId });

        if (category) {
            category.product.pull(productId);
            await category.save();
        }

        res.json({
            msg: 'Product deleted successfully',
            productDelete,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An error occurred while deleting the product',
        });
    }
}

export const productPut = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, stock, size, color, gender, amount } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name, description, price, stock, size, color, gender,amount
        }, { new: true });

        if (!updatedProduct) {
            return res.status(400).json({
                msg: 'Product not found',
            });
        }

        res.json({
            msg: 'Product update successfully',
            updatedProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An error occurred while updating the product',
        });
    }
}

export const productGet = async (req, res) => {
    try {
        const product = await Product.find();

        res.json({
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An error occurred while fetching products',
        });
    }
}

export const getTopSellingProducts = async (req, res) => {
    try {
        const topSellingProducts = await Product.find().sort({ salesCount: -1 }).limit(10);

        res.status(200).json({
            topSellingProducts
        });
    } catch (error) {
        console.error('Error fetching top selling products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const adjustStock = async (req, res) => {
    try {
        const { productId } = req.params;
        const { newStock } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.stock = newStock;
        await product.save();

        res.status(200).json({
            message: 'Stock adjusted successfully',
            product
        });
    } catch (error) {
        console.error('Error adjusting stock:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getOutofStockProducts = async (req, res) => {
    try {
        
        const outOfStockProducts = await Product.find({ stock: 0 });

        res.status(200).json({
            outOfStockProducts
        });
    } catch (error) {
        console.error('Error fetching out of stock products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const searchProducts = async (req, res) => {
    try {
        const { name, color, gender } = req.query;

        const searchCriteria = {};
        if (name) searchCriteria.name = name;
        if (color) searchCriteria.color = color;
        if (gender) searchCriteria.gender = gender;

        const products = await Product.find(searchCriteria);

        res.status(200).json({
            products
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}