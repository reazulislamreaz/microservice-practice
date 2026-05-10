import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../../../services/message.service';
import { ResponseHandler } from '../../../utils/ResponseHandler';

export class MessageController {
  static async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipientId, text } = req.body;
      const senderId = (req as any).user._id;

      const message = await MessageService.sendMessage(senderId, recipientId, text);
      ResponseHandler.success(res, { message }, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversationId } = req.params;
      const messages = await MessageService.getMessagesByConversation(conversationId);
      ResponseHandler.success(res, { messages });
    } catch (error) {
      next(error);
    }
  }

  static async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const conversations = await MessageService.getUserConversations(userId);
      ResponseHandler.success(res, { conversations });
    } catch (error) {
      next(error);
    }
  }
}
