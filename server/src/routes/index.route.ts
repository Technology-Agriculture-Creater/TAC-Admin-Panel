import express from 'express';
import userRoute from './user.route.ts';
import farmerRoute from './farmerRoute.ts';
const indexRoute = express.Router();

indexRoute.use('/user', userRoute);
indexRoute.use('/farmer', farmerRoute);

export default indexRoute;
