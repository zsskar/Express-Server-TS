import { authMiddleware } from '../auth/authMiddleware';
import * as userController from '../controllers/userController';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/:id', authMiddleware, userController.getUserById);
userRouter.get('/', authMiddleware, userController.getAllUsers);
userRouter.post('/signup', userController.createUser);
userRouter.post('/signin', userController.loginUser);
userRouter.put('/:id', authMiddleware, userController.updateUser);
userRouter.delete('/:id', authMiddleware, userController.deleteUserById);
userRouter.delete('/', authMiddleware, userController.deleteAllUsers);

export default userRouter;
