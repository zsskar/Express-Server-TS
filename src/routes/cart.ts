import * as cartController from '../controllers/cartController';
import Router from 'express';

const cartRouter = Router();

cartRouter.get("/:id/user/:userId", cartController.getCartProductByIdAndUser);
cartRouter.get("/:userId", cartController.getCartProductsByUser);
cartRouter.post("/:userId", cartController.addProductToCart);
cartRouter.delete("/:userId", cartController.deleteCartProductByIdAndUser);
cartRouter.delete("/:userId", cartController.deleteAllCartProductsByUser);

export default cartRouter;