import mongoose from 'mongoose';
import app from './app';
import { config } from './config';
import logger from './utils/logger';

let server: any;

const startServer = async () => {
  try {
    await mongoose.connect(config.mongodb_uri);
    logger.info('Connected to Auth DB');

    server = app.listen(config.port, () => {
      logger.info(`Auth Service running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

const gracefulShutdown = () => {
  logger.info('Received kill signal, shutting down gracefully');
  if (server) {
    server.close(() => {
      logger.info('Closed out remaining connections');
      mongoose.connection.close(false).then(() => {
        logger.info('MongoDB connection closed');
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

startServer();
