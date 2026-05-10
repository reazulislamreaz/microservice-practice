import express from 'express';
import cors from 'cors';
import messageRoutes from './api/v1/routes/message.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// Mounting at /api/v1/messages will give:
// POST /api/v1/messages/send
// GET /api/v1/messages/:conversationId
app.use('/api/v1/messages', messageRoutes);

// Mounting at /api/v1/conversations to satisfy GET /api/v1/conversations
app.use('/api/v1/conversations', messageRoutes); 
// Note: In messageRoutes, router.get('/') handles conversations. 
// So GET /api/v1/conversations/ will hit it. 
// If we want GET /api/v1/conversations specifically, we mount it at /api/v1/conversations and use router.get('/')

// Error handling
app.use(errorHandler);

export default app;
