import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('You are not logged in', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = AuthService.verifyToken(token);
    const user = await AuthService.getUserById(decoded.id);

    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
};
