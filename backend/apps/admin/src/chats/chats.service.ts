import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AddMessageDto } from './dtos/AddMessageDto';
import { AddMessageTransaction } from './transactions/AddMessageTransaction';
import { Chat } from '@entities/chat.entity';
import { ChatMessageReceipt } from '@entities';
import { ReadMessagesDto } from './dtos/ReadMessagesDto';

@Injectable()
export class ChatsService {
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
        id,
      },
      relations: {
        messages: {
          director: true,
          participant: true,
        }
      },
      select: {
        id: true,
        messages: {
          id: true,
          participant:{
            number: true
          },
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
    const messages = result.messages.map(({
      director, participant, content, sendAt, id
    }) => {
      const directorName = director ? `${director.firstName} + ${director.lastName}` : undefined
      return {
        id,
        participantNumber: participant.number,
        directorName,
        content,
        sendAt,
      }
    });
    return messages;
  };

  async getAllChats(studyId: string, directorId: string) {
    const result = await this.chatRepository.find({
      where: {
        studyId,
      },
    });
    const receipts = await this.receiptRepository.find({
      where: {
        directorId,
        message: {
          chat: {
            studyId,
          }
        }
      },
      relations: {
        message: true,
      },
      select: {
        message: {
          chatId: true,
        }
      }
    });
    const chats = result.map(({id, participantId}) => {
      const chatReceipts = receipts.filter((receipt) => id === receipt.message.chatId)
      return {
        id,
        participantId,
        read: chatReceipts.filter((receipt) => !receipt.readAt)?.length
      }
    });
    return chats;
  }

  async readMessages(
    { readAt }: ReadMessagesDto, 
    directorId: string, 
    chatId: string
  ) {
    const { affected } = await this.receiptRepository.update({
      directorId,
      message: {
        chatId
      }
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