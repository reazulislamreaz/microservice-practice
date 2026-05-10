import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { protect } from '../../../middleware/auth.middleware';
import { validate } from '../../../middleware/validate';
import { sendMessageSchema } from '../validations/message.validation';

const router = Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/messages/send:
 *   post:
 *     tags: [Messages]
 *     summary: Send a message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [recipientId, text]
 *             properties:
 *               recipientId: { type: string }
 *               text: { type: string }
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post('/send', validate(sendMessageSchema), MessageController.sendMessage);

/**
 * @openapi
 * /api/v1/messages/{conversationId}:
 *   get:
 *     tags: [Messages]
 *     summary: Get messages in a conversation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:conversationId', MessageController.getMessages);

/**
 * @openapi
 * /api/v1/conversations:
 *   get:
 *     tags: [Conversations]
 *     summary: Get user conversations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', MessageController.getConversations);

export default router;
