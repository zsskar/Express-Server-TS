import * as userController from '../controllers/userController';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/:id', userController.getUserById);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/signup', userController.createUser);
userRouter.post('/signin', userController.loginUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUserById);
userRouter.delete('/', userController.deleteAllUsers);

export default userRouter;
