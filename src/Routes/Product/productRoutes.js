import { Router } from 'express';
import { ProductController } from '../../Controllers/Products/productController';
import { AuthToken } from '../../Middlewars/authToken';

const productRoutes = Router();
const productController = new ProductController();
const authToken = new AuthToken();

productRoutes.post('/product/user/:id', authToken.checkToken, productController.create);
productRoutes.get('/products/user/:id', authToken.checkToken, productController.listAll);
productRoutes.get('/product/:id', authToken.checkToken, productController.listOne);
export { productRoutes };