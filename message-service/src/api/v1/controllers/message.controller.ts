import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../../../services/message.service';

export class MessageController {
  static async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipientId, text } = req.body;
      const senderId = (req as any).user._id;

      const message = await MessageService.sendMessage(senderId, recipientId, text);
      res.status(201).json({
        status: 'success',
        data: { message },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversationId } = req.params;
      const messages = await MessageService.getMessagesByConversation(conversationId);
      res.status(200).json({
        status: 'success',
        data: { messages },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const conversations = await MessageService.getUserConversations(userId);
      res.status(200).json({
        status: 'success',
        data: { conversations },
      });
    } catch (error) {
      next(error);
    }
  }
}
