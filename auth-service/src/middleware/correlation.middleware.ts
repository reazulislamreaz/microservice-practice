import { Request, Response, NextFunction } from 'express';

export const correlationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = req.headers['x-correlation-id'];
  if (correlationId) {
    (req as any).correlationId = correlationId;
  }
  next();
};
