import { response, request, json } from "express";
import bcrytjs from 'bcryptjs';
import Category from './category.model.js';

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
        const { _id, ...resto } = req.body;

        const categoryDelete = await Category.findByIdAndDelete(id, resto);

        res.status(200).json({
            msg: 'The post was updated successfully.',
            category: categoryDelete
        });

    } catch (e) {
        console.error('Error creating companies', e);
        res.status(500).json({ e: "Internal Server Error" });
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