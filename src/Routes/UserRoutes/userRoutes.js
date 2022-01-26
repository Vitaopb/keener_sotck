import { Router } from 'express';
import { registerUser } from '../../Controllers/Users/registerUserController';
import { loginUser }  from '../../Controllers/Users/loginUserController';

const userRouter = Router();

userRouter.post('/user/register', registerUser);
userRouter.post('/user/login', loginUser);

export { userRouter };