import mongoose from 'mongoose';
import config from '../config/config.ts';

const connectDB = async () => {
  await mongoose
    .connect(config.DB_URL as string)
    .then(() => {
      console.log('DB connected successfully');
    })
    .catch(() => {
      console.log('DB connection failed');
    });
};

export default connectDB;
