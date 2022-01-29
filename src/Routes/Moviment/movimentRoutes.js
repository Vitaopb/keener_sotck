import { Router } from 'express';
import { CreateMovimentController } from '../../Controllers/Moviment/CreateMovimentController';
import { ListAllMovimentationController } from '../../Controllers/Moviment/ListAllMovimentationController';
import { ListAllProductMovimentationController } from '../../Controllers/Moviment/ListAllProductMovimentationController';
import { ListOneMovimentationController } from '../../Controllers/Moviment/ListOneMovimentationController';
import { UpdateMovimentController } from '../../Controllers/Moviment/UpdateMovimentationController';
import { DeleteMovimentationController } from '../../Controllers/Moviment/DeleteMovimentationController';

const movimentRouter = Router(),
      createMovimentController = new CreateMovimentController(),
      listAllController = new ListAllMovimentationController(),
      listAllProductMovimentationController = new ListAllProductMovimentationController(),
      listOneMovimentationController = new ListOneMovimentationController(),
      updateMovimentController = new UpdateMovimentController(),
      deleteMovimentationController = new DeleteMovimentationController();

movimentRouter.post('/moviment/:userId', createMovimentController.handle);
movimentRouter.get('/moviments/:userId', listAllController.handle);
movimentRouter.get('/moviments/:userId/:productId', listAllProductMovimentationController.handle);
movimentRouter.get('/moviment/:userId/:serialNumber', listOneMovimentationController.handle);
movimentRouter.put('/moviment/:userId/:serialNumber', updateMovimentController.handle);
movimentRouter.delete('/moviment/:userId/:serialNumber', deleteMovimentationController.handle);

export { movimentRouter };