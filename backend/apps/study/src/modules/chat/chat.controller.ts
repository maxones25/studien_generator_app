import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
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
  ) {
    return this.chatService.getAllMessages(participantId);
  }

  @Get('/:lastUpdated')
  async getNewChatMessages(
    @Param('lastUpdated') lastUpdated: string, 
    @ParticipantId() participantId: string,
  ) {
    const date = new Date(lastUpdated);
    return this.chatService.getAllMessages(participantId, date);
  }

  @Put()
  async readMessages(
    @ParticipantId() participantId: string,
    @Body() data: ReadMessagesDto
    ) {
    return this.chatService.readMessages(data, participantId);
  }

  @Post()
  async addMessage(@Body() message: AddMessageDto) {
    return this.chatService.addMessage(message);
  }
}