import { getCartProductByIdAndUser, getCartProductsByUser, addProductToCart, deleteAllCartProductsByUser, deleteCartProductByIdAndUser } from '../controllers/cartController';
import Router from 'express';

const cartRouter = Router();

cartRouter.get("/:id/user/:userId", getCartProductByIdAndUser);
cartRouter.get("/:userId", getCartProductsByUser);
cartRouter.post("/:userId", addProductToCart);
cartRouter.delete("/:userId", deleteCartProductByIdAndUser);
cartRouter.delete("/:userId", deleteAllCartProductsByUser);

export default cartRouter;