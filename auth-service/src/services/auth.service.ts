import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { config } from '../config';
import { AppError } from '../utils/AppError';

export class AuthService {
  static async register(userData: any) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }
    const user = await User.create(userData);
    const token = this.generateToken(user._id.toString());
    return { user, token };
  }

  static async login(credentials: any) {
    const user = await User.findOne({ email: credentials.email }).select('+password');
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new AppError('Invalid email or password', 401);
    }
    const token = this.generateToken(user._id.toString());
    return { user, token };
  }

  static async getUserById(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  private static generateToken(userId: string) {
    return jwt.sign({ id: userId }, config.jwt_secret, {
      expiresIn: config.jwt_expires_in,
    });
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, config.jwt_secret) as { id: string };
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }
}
