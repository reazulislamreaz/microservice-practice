import { User } from './models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can further define the User type here if needed
    }
  }
}
