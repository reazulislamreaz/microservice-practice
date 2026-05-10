import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 5002,
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/message_db',
  auth_service_url: process.env.AUTH_SERVICE_URL || 'http://localhost:5001/api/v1/auth',
};
