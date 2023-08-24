import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '@entities/chat-message.entity';
import { Chat } from '@entities/chat.entity';
import { ChatMessageReceipt } from '@entities/chat-message-receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage, ChatMessageReceipt])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
