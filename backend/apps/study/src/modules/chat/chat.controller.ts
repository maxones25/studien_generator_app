import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AddMessageDto } from './dtos/AddMessageDto';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { ReadMessagesDto } from './dtos/ReadMessagesDto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('')
  async getChatMessages(
    @ParticipantId() participantId: string,
    @Query('lastUpdated') lastUpdated?: string
  ) {
    if (lastUpdated) {
      const date = new Date(lastUpdated);
      return await this.chatService.getAllMessages(participantId, date);
    }
    return await this.chatService.getAllMessages(participantId);
  }

  @Put()
  async readMessages(
    @ParticipantId() participantId: string,
    @Body() data: ReadMessagesDto
    ) {
    return await this.chatService.readMessages(data, participantId);
  }

  @Post()
  async addMessage(@Body() message: AddMessageDto) {
    return await this.chatService.addMessage(message);
  }
}