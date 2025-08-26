import globalErrorHandler from './middlewares/globalErrorHandler.ts';
import indexRoute from './routes/index.route.ts';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    // origin: config.FRONTEND_URL,
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/api', indexRoute);

// Example of Error Handler
// import createHttpError from 'http-errors';
// import type { NextFunction } from 'express';
// app.get('/', (req, res, next: NextFunction) => {
//   const error = createHttpError(400, 'Error');
//   return next(error);
// });

app.use(globalErrorHandler);

export default app;
