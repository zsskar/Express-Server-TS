import { Router } from 'express';
import productRouter from './product';
import userRouter from './user';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);

export default routes;