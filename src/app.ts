import express from 'express';
import routes from './routes/index';
import { errorHandler } from './error/handler';
import path from 'path';

const app = express();

app.use(express.json());

app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorHandler);

export default app;
