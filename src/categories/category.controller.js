import { response, request, json } from "express";
import bcrytjs from 'bcryptjs';
import Category from './category.model.js';
import Product from '../products/product.model.js';

export const categoryPost = async (req, res) => {
    const {name, description } = req.body;
    const category = new Category({ name, description });

    await category.save();

    res.status(200).json({
        category
    });
}

export const categoryPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        const categoryActualizada = await Category.findByIdAndUpdate(id, resto);

        res.status(200).json({
            msg: 'The post was updated successfully.',
            category: categoryActualizada
        });

    } catch (e) {
        console.error('Error creating companies', e);
        res.status(500).json({ e: "Internal Server Error" });
    }
}

export const categoryDelete = async (req, res) => {
    try {
        const { id } = req.params;
        
        const categoryToDelete = await Category.findById(id);

        if (!categoryToDelete) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const productsToUpdate = await Product.find({ category: id });

        if (productsToUpdate.length > 0) {
            const defaultCategory = await Category.findOne({ name: 'DEFAULT' });

            if (!defaultCategory) {
                return res.status(404).json({ error: 'Default category not found' });
            }

            await Product.updateMany({ category: id }, { category: defaultCategory._id });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'The category was successfully deleted.',
            category: categoryToDelete
        });
    } catch (error) {
        console.error('Error deleting the category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findById(categoryId).populate('product');

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const productNames = category.product.map(product => product.name);

        res.status(200).json({
            category,
            products: productNames
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const categoryGet = async (req, res) => {
    try {
        const category = await Category.find();

        res.json({
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An error occurred while fetching category',
        });
    }
}