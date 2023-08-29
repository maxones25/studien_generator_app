import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { Roles } from '@admin/roles/roles.decorator';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { ParticipantGuard } from '../guards/participant.guard';
import { GroupQueryDto } from '@admin/groups/dtos/GroupQueryDto';

@Controller('participants')
export class ParticipantsQueries {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get('getByStudy')
  @Roles('admin', 'employee')
  async getByStudy(@Param('studyId') studyId: string) {
    return this.participantsService.getByStudy(studyId);
  }

  @Get('getByGroup')
  @Roles('admin', 'employee')
  async getByGroup(@Query() { groupId }: GroupQueryDto) {
    return this.participantsService.getByGroup(groupId);
  }

  @Get('getById')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async getById(@Query() { participantId }: ParticipantQueryDto) {
    return this.participantsService.getById(participantId);
  }
}
