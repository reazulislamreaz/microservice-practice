import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { config } from '../config';
import { AppError } from '../utils/AppError';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('You are not logged in', 401);
    }

    const response = await axios.get(`${config.auth_service_url}/verify`, {
      headers: { Authorization: authHeader },
    });

    if (response.data.status !== 'success') {
      throw new AppError('Unauthorized', 401);
    }

    (req as any).user = response.data.data.user;
    next();
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return next(new AppError('Unauthorized', 401));
    }
    next(new AppError('Auth Service unavailable', 503));
  }
};
