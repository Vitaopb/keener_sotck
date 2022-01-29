import { Router } from 'express';
import { CreateProductController } from '../../Controllers/Product/CreateProductController';
import { ListAllProductController } from '../../Controllers/Product/ListAllProductController';
import { ListOneProductController } from '../../Controllers/Product/ListOneProductController';
import { UpdateProductController } from '../../Controllers/Product/UpdateProductController';
import { DeleteProductController } from '../../Controllers/Product/DeleteProductController';
import { Authorization } from '../../Middlewars/Authorization'

const productRouter = Router(),
      authorization = new Authorization(),
      createProductController = new CreateProductController(),
      listAllProductController = new ListAllProductController(),
      listOneProductController = new ListOneProductController(),
      updateProductController = new UpdateProductController(),
      deleteProductController = new DeleteProductController();

productRouter.post('/product/create/:id', authorization.check, createProductController.handle);
productRouter.get('/products/:id', authorization.check, listAllProductController.handle);
productRouter.get('/product/:id/:barcode', authorization.check, listOneProductController.handle);
productRouter.put('/product/:id/:barcode', authorization.check, updateProductController.handle);
productRouter.delete('/product/:id/:barcode', authorization.check, deleteProductController.handle);

export { productRouter };


