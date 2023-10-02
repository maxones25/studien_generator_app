import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AddMessageTransaction } from './transactions/AddMessageTransaction';
import { Chat } from '@entities';
import { ChatMessageReceipt } from '@entities';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class ChatsService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @Inject(MessagesRepository)
    private messagesRepository: MessagesRepository,
    @InjectRepository(ChatMessageReceipt)
    private receiptRepository: Repository<ChatMessageReceipt>,
  ) {}
  

  getMessages(chatId: string) {
    return this.messagesRepository.getMessages(chatId);
  }

  async getAllChats(studyId: string, directorId: string) {
    const result = await this.chatRepository.find({
      where: {
        studyId,
      },
      relations: {
        messages: {
          receipts: true,
        },
        participant: true,
      },
      select: {
        messages: {
          content: true,
          sentAt: true,
          receipts: {},
        },
        participant: {
          id: true,
          number: true,
        },
      },
    });

    const receipts = await this.receiptRepository.find({
      where: {
        directorId,
        message: {
          chat: {
            studyId,
          },
        },
      },
      relations: {
        message: true,
      },
      select: {
        message: {
          chatId: true,
        },
      },
    });

    const chats = result.map(({ id, participant, messages }) => {
      const chatReceipts = receipts.filter(
        (receipt) => id === receipt.message.chatId,
      );
      return {
        id,
        participantId: participant.id,
        participantNumber: participant.number,
        participant,
        messages,
        newestMessage: messages.reduce(
          (maxDate, current) =>
            current.sentAt > maxDate.sentAt ? current : maxDate,
          { sentAt: new Date(0) },
        ),
        unread: chatReceipts.filter((receipt) => !receipt.readAt)?.length,
      };
    });
    return chats;
  }

  async addMessage(directorId: string, chatId: string, content: string) {
    return new AddMessageTransaction(this.entityManager).run({
      directorId,
      chatId,
      content,
    });
  }

  async getUnreadMessages(studyId: string, directorId: string) {
    return this.messagesRepository.getUnreadMessages(studyId, directorId);
  }
}
