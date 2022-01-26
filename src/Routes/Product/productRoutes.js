import { Router } from 'express';
import { createProduct } from '../../Controllers/Products/createProductController';
import { checkToken } from '../../Middlewars/authToken';

const productRoutes = Router();

productRoutes.post('/product/user/:id', checkToken, createProduct);

export { productRoutes };