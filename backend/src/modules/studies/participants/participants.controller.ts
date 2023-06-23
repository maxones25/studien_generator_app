import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Types } from '../../../decorators/type.decorator';
import { ParticipantDto } from './dtos/participantDto';

@Controller('studies')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Types('director')
  @Post('groups/:groupId/participants')
  async create(
    @Param('groupId') groupId: string,
    @Body() participantDto: ParticipantDto,
  ) {
    return this.participantsService.create(groupId, participantDto);
  }

  @Types('director')
  @Get(':studyId/participants')
  async findParticipantsByStudy(@Param('studyId') studyId: string) {
    return this.participantsService.getByStudy(studyId);
  }

  @Types('director')
  @Get('groups/:groupId/participants')
  async findParticipantsByGroup(@Param('groupId') groupId: string) {
    return this.participantsService.getByGroup(groupId);
  }

  @Types('director')
  @Delete('participants/:participantId')
  async deleteParticipant(@Param('participantId') participantId: string) {
    this.participantsService.delete(participantId);
  }
}
