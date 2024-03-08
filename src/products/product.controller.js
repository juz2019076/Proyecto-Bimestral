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