import express from 'express';
import userRoute from './user.route.ts';

const indexRoute = express.Router();

indexRoute.use('/user', userRoute);

export default indexRoute;
