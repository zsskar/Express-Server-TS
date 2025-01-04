import { createPurchase, getAllPurchasesByUser, getPurchaseByIdAndUser } from '../controllers/purchaseController';
import Router from 'express'

const purchaseRouter = Router();

purchaseRouter.post("/", createPurchase);
purchaseRouter.get("/:userId", getAllPurchasesByUser);
purchaseRouter.get("/:id/user/:userId", getPurchaseByIdAndUser);


export default purchaseRouter;


