import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AddMessageDto } from './dtos/AddMessageDto';
import { AddMessageTransaction } from './transactions/AddMessageTransaction';
import { Chat } from '@entities/chat.entity';
import { ChatMessageReceipt } from '@entities';
import { ReadMessagesDto } from './dtos/ReadMessagesDto';

@Injectable()
export class ChatService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(ChatMessageReceipt)
    private receiptRepository: Repository<ChatMessageReceipt>,
  ) {}

  async getAllMessages(id: string) {
    const result = await this.chatRepository.findOne({
      where: {
        participantId: id,
      },
      relations: {
        messages: {
          director: true,
        }
      },
      select: {
        id: true,
        messages: {
          id: true,
          participantId: true,
          director: {
            firstName: true,
            lastName: true,
          },
          content: true,
          sendAt: true,
        }
      },
      order: {
        messages: {
          sendAt: 'ASC'
        }
      }
    });
    const receipts = await this.receiptRepository.find({
      where: {
        participantId: id
      }
    });
    const messages = result.messages.map(({
      director, participantId, content, sendAt, id
    }) => {
      const directorName = director ? `${director.firstName} + ${director.lastName}` : undefined
      return {
        id,
        participantId,
        directorName,
        content,
        sendAt,
        readAt: receipts?.find((receipt) => receipt.messageId === id)?.readAt,
      }
    });
    return messages;
  };

  async readMessages({ readAt }: ReadMessagesDto, participantId: string) {
    const { affected } = await this.receiptRepository.update({
      participantId
    }, {
      readAt
    });
    return affected;
  };

  async addMessage(message: AddMessageDto) {
    return new AddMessageTransaction(this.entityManager).run(
      message,
    );
  };
}