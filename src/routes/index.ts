import { Router } from 'express';
import productRouter from '@routes/product';
import userRouter from '@routes/user';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);

export default routes;