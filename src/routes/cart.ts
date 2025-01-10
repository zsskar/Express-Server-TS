import { authMiddleware } from '../auth/authMiddleware';
import * as cartController from '../controllers/cartController';
import Router from 'express';

const cartRouter = Router();

cartRouter.get(
  '/:id/user/:userId',
  authMiddleware,
  cartController.getCartProductByIdAndUser,
);
cartRouter.get(
  '/:userId',
  authMiddleware,
  cartController.getCartProductsByUser,
);
cartRouter.post('/:userId', authMiddleware, cartController.addProductToCart);
cartRouter.delete(
  '/:userId',
  authMiddleware,
  cartController.deleteCartProductByIdAndUser,
);
cartRouter.delete(
  '/:userId',
  authMiddleware,
  cartController.deleteAllCartProductsByUser,
);

export default cartRouter;
