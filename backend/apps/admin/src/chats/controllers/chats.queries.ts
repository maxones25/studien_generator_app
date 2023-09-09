import {
  Controller,
  Get,
  Inject,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/decorators/director-id.decorator';
import { ChatsService } from '../chats.service';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { ChatQueryDto } from '../dtos/ChatQueryDto';

@Controller()
@UseGuards(StudyGuard)
export class ChatsQueries {
  constructor(
    @Inject(ChatsService)
    private readonly chatService: ChatsService,
  ) {}

  @Get('chats/unreadMessages')
  @Roles('admin', 'employee')
  getUnreadMessages(
    @Query() { studyId }: StudyQueryDto,
    @DirectorId() directorId: string,
  ) {
    return this.chatService.getUnreadMessages(studyId, directorId);
  }

  @Get('/chats/getMessages')
  @Roles('admin', 'employee')
  async getChatMessages(@Query() { chatId }: ChatQueryDto) {
    return this.chatService.getMessages(chatId);
  }

  @Get('/studies/:studyId/chats')
  @Roles('admin', 'employee')
  async getChats(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @DirectorId() directorId: string,
  ) {
    return this.chatService.getAllChats(studyId, directorId);
  }
}
