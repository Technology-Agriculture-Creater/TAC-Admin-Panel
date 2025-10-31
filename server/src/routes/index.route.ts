import express from 'express';
import userRoute from './user.route.ts';
import farmerRoute from './farmerRoute.ts';
import bdoRoute from './bdo.routes.ts';
const indexRoute = express.Router();

indexRoute.use('/user', userRoute);
indexRoute.use('/farmer', farmerRoute);
indexRoute.use('/bdo',bdoRoute);

export default indexRoute;
