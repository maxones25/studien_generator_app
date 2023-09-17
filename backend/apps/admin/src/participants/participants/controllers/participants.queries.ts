import {
  Controller,
  Get,
  ParseBoolPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { Roles } from '@admin/members/infrastructure/http';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { ParticipantGuard } from '../guards/participant.guard';
import { GroupQueryDto } from '@admin/groups/dtos/GroupQueryDto';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { GroupGuard } from '@admin/groups/guards/group.guard';
import { DeletedDto } from '@shared/modules/records/DeletedDto';
import { IsParticipantDeletedGuard } from '../guards/IsParticipantDeletedGuard';

@Controller('participants')
export class ParticipantsQueries {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get('getByStudy')
  @Roles('admin', 'employee')
  @UseGuards(StudyGuard)
  async getByStudy(
    @Query('deleted', ParseBoolPipe) deleted: boolean,
    @Query() { studyId }: StudyQueryDto,
  ) {
    return this.participantsService.getByStudy(studyId, deleted);
  }

  @Get('getByGroup')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  async getByGroup(@Query() { groupId }: GroupQueryDto) {
    return this.participantsService.getByGroup(groupId);
  }

  @Get('getById')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard, IsParticipantDeletedGuard)
  async getById(@Query() { participantId }: ParticipantQueryDto) {
    return this.participantsService.getById(participantId);
  }
}
