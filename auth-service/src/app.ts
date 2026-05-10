import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './api/v1/routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';
import { correlationIdMiddleware } from './middleware/correlation.middleware';

const app = express();

// Security & Performance Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(correlationIdMiddleware);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(errorHandler);

export default app;
