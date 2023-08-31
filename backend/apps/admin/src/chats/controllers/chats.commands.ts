import { Controller, Get, Post, Body, Put, Param, UseGuards } from '@nestjs/common';
import { ChatsService } from '../chats.service';
import { AddMessageDto } from '../dtos/AddMessageDto';
import { ReadMessagesDto } from '../dtos/ReadMessagesDto';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/decorators/director-id.decorator';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('/studies/:studyId/chats')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class ChatsCommands {
  constructor(private readonly chatService: ChatsService) {}

  @Put('/:chatId')
  @Roles('admin', 'employee')
  async readMessages(
    @Param('chatId', new ValidateIdPipe()) chatId: string,
    @DirectorId() directorId: string,
    @Body() data: ReadMessagesDto,
  ) {
    return this.chatService.readMessages(data, directorId, chatId);
  }

  @Post('/:chatId')
  @Roles('admin', 'employee')
  async addMessage(
    @Param('chatId', new ValidateIdPipe()) chatId: string,
    @DirectorId() directorId: string,
    @Body() addMessageDto: AddMessageDto,
  ) {
    return this.chatService.addMessage(addMessageDto, chatId, directorId);
  }
}
