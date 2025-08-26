import mongoose from 'mongoose';
import config from '../config/config.ts';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('DB connected successfully');
    });
    await mongoose.connect(config.DB_URL as string);
  } catch (error) {
    mongoose.connection.on('error', (err) => {
      console.log('DB connection failed');
      console.log(err);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('DB disconnected');
    });
    process.exit(1);
  }
};

export default connectDB;
