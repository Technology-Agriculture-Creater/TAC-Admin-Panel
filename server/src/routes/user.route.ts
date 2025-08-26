import express from 'express';
import { register, login, logout } from '../controllers/user.controller.ts';

const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.get('/logout', logout);

export default authRoute;
