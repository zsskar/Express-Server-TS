import { Router } from 'express';
import productRouter from './product';
import userRouter from './user';
import purchaseRouter from './purchase';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/products', productRouter);
routes.use('/purchases', purchaseRouter);


export default routes;