import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    recipientId: z.string().min(24, 'Invalid recipient ID'),
    text: z.string().min(1, 'Message text is required'),
  }),
});
