import { Router } from 'express';
import { RegisterUserController } from '../../Controllers/User/RegisterUserController';
import { LoginUserController }  from '../../Controllers/User/LoginUserController';

const userRouter = Router(),
      loginUserController = new LoginUserController(),
      registerUserController = new RegisterUserController();

userRouter.post('/user/register', registerUserController.handle);
userRouter.post('/user/login', loginUserController.handle);

export { userRouter };