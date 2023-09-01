import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '@entities';
import { Chat } from '@entities';
import { ChatMessageReceipt } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage, ChatMessageReceipt])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
