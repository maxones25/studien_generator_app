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
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/members/infrastructure/http';
import { DirectorId } from '@admin/directors/infrastructure/http/decorators/director-id.decorator';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';
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
  @UseGuards(ChatGuard)
  @Roles('admin', 'employee')
  async readMessages(
    @Query() { chatId }: ChatQueryDto,
    @DirectorId() directorId: string,
  ) {
    const readAt = new Date();
    return this.readMessagesUseCase.execute({ directorId, chatId, readAt });
  }

  @Post('studies/:studyId/chats/:chatId')
  @UseGuards(ChatGuard)
  @Roles('admin', 'employee')
  async addMessage(
    @Query() { chatId }: ChatQueryDto,
    @DirectorId() directorId: string,
    @Body() { content }: AddMessageDto,
  ) {
    return this.chatService.addMessage(directorId, chatId, content);
  }
}
