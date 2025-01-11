import { authMiddleware } from '../auth/authMiddleware';
import * as purchaseController from '../controllers/purchaseController';
import Router from 'express';

const purchaseRouter = Router();

purchaseRouter.post('/', authMiddleware, purchaseController.createPurchase);
purchaseRouter.get(
  '/:userId',
  authMiddleware,
  purchaseController.getAllPurchasesByUser,
);
purchaseRouter.get(
  '/:id/user/:userId',
  authMiddleware,
  purchaseController.getPurchaseByIdAndUser,
);

export default purchaseRouter;
