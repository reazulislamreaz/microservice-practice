import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../../../middleware/validate';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { protect } from '../../../middleware/auth.middleware';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/me', protect, AuthController.getMe);
router.get('/verify', AuthController.verify); // Internal use by other services

export default router;
