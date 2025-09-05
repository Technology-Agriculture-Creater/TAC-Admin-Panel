import indexRoute from './routes/index.route.ts';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
