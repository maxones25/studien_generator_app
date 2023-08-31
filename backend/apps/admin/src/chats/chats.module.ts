import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '@entities/chat-message.entity';
import { Chat } from '@entities/chat.entity';
import { ChatMessageReceipt } from '@entities/chat-message-receipt.entity';
import providers from './chats.providers';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage, ChatMessageReceipt])],
  providers,
  exports: [ChatsService],
})
export class ChatsModule {}
