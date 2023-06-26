import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Types } from '../../decorators/type.decorator';
import { ParticipantDto } from './dtos/participantDto';
import { Roles } from '../../decorators/roles.decorator';

@Controller('studies/:studyId')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Types('director')
  @Roles('admin')
  @Post('groups/:groupId/participants')
  async create(
    @Param('studyId') studyId: string,
    @Param('groupId') groupId: string,
    @Body() participantDto: ParticipantDto,
  ) {
    return this.participantsService.create(studyId, groupId, participantDto);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get('participants')
  async findParticipantsByStudy(@Param('studyId') studyId: string) {
    return this.participantsService.getByStudy(studyId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get('groups/:groupId/participants')
  async findParticipantsByGroup(@Param('groupId') groupId: string) {
    return this.participantsService.getByGroup(groupId);
  }

  @Types('director')
  @Roles('admin')
  @Delete('groups/:groupId/participants/:participantId')
  async deleteParticipant(@Param('participantId') participantId: string) {
    this.participantsService.delete(participantId);
  }
}
