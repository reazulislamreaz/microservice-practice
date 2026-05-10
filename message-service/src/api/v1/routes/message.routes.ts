import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { protect } from '../../../middleware/auth.middleware';
import { validate } from '../../../middleware/validate';
import { sendMessageSchema } from '../validations/message.validation';

const router = Router();

router.use(protect);

router.post('/send', validate(sendMessageSchema), MessageController.sendMessage);
router.get('/:conversationId', MessageController.getMessages);
router.get('/', MessageController.getConversations); // This is /api/v1/conversations when mounted

export default router;
