import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AddMessageDto } from './dtos/AddMessageDto';
import { ReadMessagesDto } from './dtos/ReadMessagesDto';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/decorators/director-id.decorator';

@Controller('/studies/:studyId/chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Get('/:chatId')
  @Roles('admin', 'employee')
  async getChatMessages(
    @Param('chatId', new ValidateIdPipe()) chatId: string,
  ) {
    return this.chatService.getAllMessages(chatId);
  }

  @Get('')
  @Roles('admin', 'employee')
  async getChats(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @DirectorId() directorId: string,
  ) {
    return this.chatService.getAllChats(studyId, directorId);
  }

  @Put('/:chatId')
  @Roles('admin', 'employee')
  async readMessages(
    @Param('chatId', new ValidateIdPipe()) chatId: string,
    @DirectorId() directorId: string,
    @Body() data: ReadMessagesDto
    ) {
    return this.chatService.readMessages(data, directorId, chatId);
  }

  @Post('/:chatId')
  @Roles('admin', 'employee')
  async addMessage(
    @Param('chatId', new ValidateIdPipe()) chatId: string,
    @DirectorId() directorId: string,
    @Body() addMessageDto: AddMessageDto
  ) {
    return this.chatService.addMessage(addMessageDto, chatId, directorId);
  }
}