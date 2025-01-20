import { multerUpload } from 'utils/multerConfig';
import { authMiddleware } from '../auth/authMiddleware';
import * as userController from '../controllers/userController';
import { Router } from 'express';
import { imageUtils } from 'utils/fileAllowedTypes';

const userRouter = Router();

userRouter.get('/:userId', authMiddleware, userController.getUserById);
userRouter.get('/', authMiddleware, userController.getAllUsers);
userRouter.post('/signup', userController.createUser);
userRouter.post('/signin', userController.loginUser);
userRouter.post(
  '/updatePassword/:userId',
  authMiddleware,
  userController.updatePassword,
);
userRouter.post(
  '/updateProfile/:userId',
  authMiddleware,
  multerUpload(
    imageUtils.path,
    imageUtils.allowedTypes,
    imageUtils.errorMsg,
  ).single('profilePic'),
  userController.updateProfile,
);
userRouter.post('/checkForEmail', userController.checkIsEmailExist);
userRouter.put('/:userId', authMiddleware, userController.updateUser);
userRouter.delete('/:userId', authMiddleware, userController.deleteUserById);
userRouter.delete('/', authMiddleware, userController.deleteAllUsers);

export default userRouter;
