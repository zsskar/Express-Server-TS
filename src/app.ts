import express, { Request, Response } from 'express';
import routes from './routes/index';
import { errorHandler } from './error/handler';
import { rootPathMsg } from './utils/apisMeta';

const app = express();

app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

export default app;
