import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import CircuitBreaker from 'opossum';
import { config } from '../config';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';

const verifyToken = async (authHeader: string) => {
  const response = await axios.get(`${config.auth_service_url}/verify`, {
    headers: { Authorization: authHeader },
  });
  return response.data;
};

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
  resetTimeout: 30000, // After 30 seconds, try again.
};

const breaker = new CircuitBreaker(verifyToken, options);

breaker.on('open', () => logger.warn('Auth Service Circuit Breaker OPEN'));
breaker.on('halfOpen', () => logger.info('Auth Service Circuit Breaker HALF-OPEN'));
breaker.on('close', () => logger.info('Auth Service Circuit Breaker CLOSED'));

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('You are not logged in', 401);
    }

    const data = await breaker.fire(authHeader);

    if (data.status !== 'success') {
      throw new AppError('Unauthorized', 401);
    }

    (req as any).user = data.data.user;
    next();
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return next(new AppError('Unauthorized', 401));
    }
    if (breaker.opened) {
      return next(new AppError('Auth Service currently unavailable (Circuit Open)', 503));
    }
    next(new AppError('Auth Service unavailable', 503));
  }
};
