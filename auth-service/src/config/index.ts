import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 5001,
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_db',
  jwt_secret: process.env.JWT_SECRET || 'super_secret_jwt_key',
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '1d',
};
