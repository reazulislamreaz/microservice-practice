import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const sendMessageSchema = z.object({
  body: z.object({
    recipientId: objectIdSchema,
    text: z.string().min(1, 'Message text is required'),
  }),
});

export const getMessagesSchema = z.object({
  params: z.object({
    conversationId: objectIdSchema,
  }),
});
