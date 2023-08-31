import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/decorators/director-id.decorator';
import { ChatsService } from '../chats.service';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';

@Controller('/studies/:studyId/chats')
@UseGuards(StudyGuard)
export class ChatsQueries {
  constructor(
    @Inject(ChatsService)
    private readonly chatService: ChatsService,
  ) {}

  @Get('/:chatId')
  @Roles('admin', 'employee')
  async getChatMessages(@Param('chatId', new ValidateIdPipe()) chatId: string) {
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
}
