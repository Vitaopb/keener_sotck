import { Router } from 'express';
import { OutputProductsController } from '../../Controllers/Outputs/outputProductController';

const outputRoutes = Router(),
      outputController = new OutputProductsController();

outputRoutes.post('/output/user/:id', outputController.register);
outputRoutes.get('/outputs/user/:id/:productId', outputController.listAllProduct);
outputRoutes.get('/outputs/user/:id', outputController.listAll);

export { outputRoutes };