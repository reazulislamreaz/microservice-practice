import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

const startServer = async () => {
  try {
    await mongoose.connect(config.mongodb_uri);
    console.log('Connected to Message DB');

    app.listen(config.port, () => {
      console.log(`Message Service running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

startServer();
