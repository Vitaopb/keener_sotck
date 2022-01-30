import { Router } from 'express';
import { CreateMovementController } from '../../Controllers/Movement/CreateMovementController';
import { ListAllMovementsController } from '../../Controllers/Movement/ListAllMovementsController';
import { ListAllProductMovementsController } from '../../Controllers/Movement/ListAllProductMovementsController';
import { ListOneMovementsController } from '../../Controllers/Movement/ListOneMovementsController';
import { UpdateMovementController } from '../../Controllers/Movement/UpdateMovementsController';
import { DeleteMovementsController } from '../../Controllers/Movement/DeleteMovementsController';
import { Authorization } from '../../Middlewars/Authorization';

const movementRouter = Router(),
      createMovementController = new CreateMovementController(),
      listAllController = new ListAllMovementsController(),
      listAllProductMovementsController = new ListAllProductMovementsController(),
      listOneMovementsController = new ListOneMovementsController(),
      updateMovementController = new UpdateMovementController(),
      deleteMovementsController = new DeleteMovementsController(),
      authorization = new Authorization();

movementRouter.post('/movement/:userId', authorization.check, createMovementController.handle);
movementRouter.get('/movements/:userId', authorization.check, listAllController.handle);
movementRouter.get('/movements/:userId/:productId', authorization.check, listAllProductMovementsController.handle);
movementRouter.get('/movement/:userId/:serialNumber', authorization.check, listOneMovementsController.handle);
movementRouter.put('/movement/:userId/:serialNumber', authorization.check, updateMovementController.handle);
movementRouter.delete('/movement/:userId/:serialNumber', authorization.check, deleteMovementsController.handle);

export { movementRouter };