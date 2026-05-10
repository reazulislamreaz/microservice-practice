import express from 'express';
import cors from 'cors';
import authRoutes from './api/v1/routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(errorHandler);

export default app;
