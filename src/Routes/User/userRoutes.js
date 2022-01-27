import { Router } from 'express';
import { RegisterUserController } from '../../Controllers/Users/registerUserController';
import { LoginUserController }  from '../../Controllers/Users/loginUserController';


const userRouter = Router(),
      loginUserController = new LoginUserController(),
      registerUserController = new RegisterUserController();

userRouter.post('/user/register', registerUserController.register);
userRouter.post('/user/login', loginUserController.login);

export { userRouter };