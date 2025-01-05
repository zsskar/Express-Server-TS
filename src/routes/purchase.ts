import * as purchaseController from '../controllers/purchaseController';
import Router from 'express'

const purchaseRouter = Router();

purchaseRouter.post("/", purchaseController.createPurchase);
purchaseRouter.get("/:userId", purchaseController.getAllPurchasesByUser);
purchaseRouter.get("/:id/user/:userId", purchaseController.getPurchaseByIdAndUser);


export default purchaseRouter;


