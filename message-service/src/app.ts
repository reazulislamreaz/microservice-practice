import express from 'express';
import cors from 'cors';
import messageRoutes from './api/v1/routes/message.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/conversations', messageRoutes);

// Error handling
app.use(errorHandler);

export default app;
