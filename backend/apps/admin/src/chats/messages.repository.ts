import { Chat, ChatMessage } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository } from '@shared/modules/records/entity.repository';
import { IsNull, Repository } from 'typeorm';

export class MessagesRepository {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly db: Repository<ChatMessage>,
  ) {}

  getMessages(chatId: string) {
    return this.db.find({
      select: {
        id: true,
        content: true,
        sentAt: true,
        director: {
          id: true,
          firstName: true,
          lastName: true,
        },
        participant: {
          id: true,
          number: true,
        },
      },
      relations: {
        director: true,
        participant: true,
      },
      where: {
        chatId,
      },
      order: {
        sentAt: 'ASC',
      },
    });
  }

  async getUnreadMessages(studyId: string, directorId: string) {
    const unreadMessages = await this.db.find({
      select: {
        id: true,
      },
      where: {
        chat: {
          studyId,
        },
        receipts: {
          directorId,
          readAt: IsNull(),
        },
      },
    });

    return unreadMessages.length;
  }
}
