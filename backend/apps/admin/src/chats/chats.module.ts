import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import providers from './chats.providers';
import { ChatsService } from './chats.service';
import { Chat, ChatMessage, ChatMessageReceipt } from '@entities';
import { ReadMessagesUseCase } from './transactions/ReadMessagesUseCase';
import { ChatsRepository } from './chats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage, ChatMessageReceipt])],
  providers,
  exports: [ChatsService, ReadMessagesUseCase, ChatsRepository],
})
export class ChatsModule {}
