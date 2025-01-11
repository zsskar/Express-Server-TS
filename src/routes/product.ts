import { authMiddleware } from '../auth/authMiddleware';
import * as productController from '../controllers/productController';
import { Router } from 'express';

const productRouter = Router();

productRouter.get('/:id', authMiddleware, productController.getProductById);
productRouter.get('/', authMiddleware, productController.getAllProducts);
productRouter.post('/', authMiddleware, productController.createProduct);
productRouter.put('/:id', authMiddleware, productController.updateProduct);
productRouter.delete(
  '/:id',
  authMiddleware,
  productController.deleteProductById,
);
productRouter.delete('/', authMiddleware, productController.deleteAllProducts);

export default productRouter;
