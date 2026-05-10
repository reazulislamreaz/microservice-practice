import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

export class MessageService {
  static async sendMessage(senderId: string, recipientId: string, text: string) {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      text,
    });

    return message;
  }

  static async getMessagesByConversation(conversationId: string) {
    return await Message.find({ conversationId }).sort({ createdAt: 1 });
  }

  static async getUserConversations(userId: string) {
    return await Conversation.find({ participants: userId }).sort({ updatedAt: -1 });
  }
}
