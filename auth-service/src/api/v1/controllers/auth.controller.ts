import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../services/auth.service';
import { ResponseHandler } from '../../../utils/ResponseHandler';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await AuthService.register(req.body);
      ResponseHandler.success(res, { user, token }, 201);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await AuthService.login(req.body);
      ResponseHandler.success(res, { user, token });
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getUserById((req as any).user.id);
      ResponseHandler.success(res, { user });
    } catch (error) {
      next(error);
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided');
      }
      const token = authHeader.split(' ')[1];
      const decoded = AuthService.verifyToken(token);
      const user = await AuthService.getUserById(decoded.id);
      ResponseHandler.success(res, { user });
    } catch (error) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
  }
}
