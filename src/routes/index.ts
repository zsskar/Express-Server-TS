import { Router } from 'express';
import productRouter from './product';
import userRouter from './user';
import purchaseRouter from './purchase';
import cartRouter from './cart';
import { limiter } from '../utils/rateLimiter';

const routes = Router();

routes.use('/users', limiter, userRouter);
routes.use('/products', productRouter);
routes.use('/purchases', purchaseRouter);
routes.use('/cart', cartRouter);

export default routes;
