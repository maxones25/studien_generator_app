import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '@entities/chat-message.entity';
import { Chat } from '@entities/chat.entity';
import { ChatMessageReceipt } from '@entities/chat-message-receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage, ChatMessageReceipt])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
