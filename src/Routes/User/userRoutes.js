import { Router } from 'express';
import { RegisterUserController } from '../../Controllers/User/RegisterUserController';
import { LoginUserController }  from '../../Controllers/User/LoginUserController';
import { ListUsersController } from '../../Controllers/User/ListUsersController';
import { UpdateUserController } from '../../Controllers/User/UpdateUserController';
import { DeleteUserController } from '../../Controllers/User/DeleteUserController';
import { Authorization } from '../../Middlewars/Authorization';

const userRouter = Router(),
      loginUserController = new LoginUserController(),
      registerUserController = new RegisterUserController(),
      listUsersController = new ListUsersController(),
      updateUserController = new UpdateUserController(),
      deleteUserController = new DeleteUserController(),
      authorization = new Authorization();

userRouter.post('/user/register', registerUserController.handle);
userRouter.post('/user/login', loginUserController.handle);
userRouter.get('/users', authorization.check, listUsersController.handle);
userRouter.put('/user/:userId', authorization.check, updateUserController.handle);
userRouter.delete('/user/:userId', authorization.check, deleteUserController.handle);

export { userRouter };