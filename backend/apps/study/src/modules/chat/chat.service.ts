import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, MoreThan, Repository } from 'typeorm';
import { AddMessageDto } from './dtos/AddMessageDto';
import { AddMessageTransaction } from './transactions/AddMessageTransaction';
import { Chat } from '@entities/chat.entity';
import { ChatMessageReceipt } from '@entities';
import { ReadMessagesDto } from './dtos/ReadMessagesDto';
import { MessageDto } from './dtos/MessageDto';

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

  async getAllMessages(id: string, lastUpdated?: Date) {
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
          sentAt: true,
          modifiedAt: true,
        }
      },
      order: {
        messages: {
          sentAt: 'ASC'
        }
      }
    });
    const receipts = await this.receiptRepository.find({
      where: {
        participantId: id
      }
    });

    const messages = result.messages.reduce((filtered, {
      director, participantId, content, sentAt, id, modifiedAt
    }) => {
      const readAt = receipts?.find((receipt) => receipt.messageId === id)?.readAt
      if (!lastUpdated || modifiedAt > lastUpdated || readAt > lastUpdated) {
        const directorName = director ? `${director.firstName} ${director.lastName}` : undefined
        const message = {
          id,
          participantId,
          directorName,
          content,
          sentAt,
          readAt: readAt,
        }
        filtered.push(message)
      }
      return filtered
    }, []);
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