import {
  Controller,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  HttpCode,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { ChatsService } from '../chats.service';
import { AddMessageDto } from '../dtos/AddMessageDto';
import { ReadMessagesDto } from '../dtos/ReadMessagesDto';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/infrastructure/http/decorators/director-id.decorator';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { ChatQueryDto } from '../dtos/ChatQueryDto';
import { ChatGuard } from '../guards/ChatGuard';
import { ReadMessagesUseCase } from '../transactions/ReadMessagesUseCase';

@Controller()
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class ChatsCommands {
  constructor(
    @Inject(ReadMessagesUseCase)
    private readonly readMessagesUseCase: ReadMessagesUseCase,
    private readonly chatService: ChatsService,
  ) {}

  @Post('chats/readMessages')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ChatGuard)
  async readMessages(
    @Query() { chatId }: ChatQueryDto,
    @DirectorId() directorId: string,
  ) {
    const readAt = new Date();
    return this.readMessagesUseCase.execute({ directorId, chatId, readAt });
  }

  @Post('studies/:studyId/chats/:chatId')
  @Roles('admin', 'employee')
  async addMessage(
    @Param('chatId', new ValidateIdPipe()) chatId: string,
    @DirectorId() directorId: string,
    @Body() { content }: AddMessageDto,
  ) {
    return this.chatService.addMessage(directorId, chatId, content);
  }
}
