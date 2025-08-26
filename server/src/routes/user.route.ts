import express from 'express';

const authRoute = express.Router();

authRoute.post('/register', (req, res) => {
  res.send('Register');
});

authRoute.post('/login', (req, res) => {
  res.send('Login');
});

authRoute.get('/logout', (req, res) => {
  res.send('Logout');
});

export default authRoute;
