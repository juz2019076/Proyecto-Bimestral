'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/userRoutes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';
import productRoutes from '../src/products/product.routes.js';
import facturaRoutes from '../src/bill/bill.routes.js';
import shoppingCartRoutes from '../src/shoppingCart/shoppingCart.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/businessmanagerApi/v1/users';
        this.authPath = '/businessmanagerApi/v1/auth';
        this.categoryPath = '/businessmanagerApi/v1/category';
        this.productPath = '/businessmanagerApi/v1/product';
        this.facturaPath = '/businessmanagerApi/v1/bill';
        this.shoppingCartPath = '/businessmanagerApi/v1/cart';

        this.middleware();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usersPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.facturaPath, facturaRoutes);
        this.app.use(this.shoppingCartPath, shoppingCartRoutes);
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;