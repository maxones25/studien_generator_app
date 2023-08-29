import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '@entities/chat-message.entity';
import { Chat } from '@entities/chat.entity';
import { ChatMessageReceipt } from '@entities/chat-message-receipt.entity';
import providers from './chats.providers';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage, ChatMessageReceipt])],
  controllers: [ChatsController],
  providers,
  exports: [ChatsService],
})
export class ChatsModule {}
