import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Types } from '../../decorators/type.decorator';
import { ParticipantDto } from './dtos/participantDto';
import { Roles } from '../../decorators/roles.decorator';

@Controller('studies/:studyId')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post('participants')
  async create(
    @Param('studyId') studyId: string,
    @Body() participantDto: ParticipantDto,
  ) {
    return this.participantsService.create(studyId, participantDto);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Put('participants/:participantId')
  async update(
    @Param('participantId') participantId: string,
    @Body() updateParticipant: ParticipantDto,
  ) {
    return this.participantsService.update(participantId, updateParticipant);
  }

  @Types('director')
  @Roles('admin')
  @Delete('participants/:participantId')
  async deleteParticipant(@Param('participantId') participantId: string) {
    this.participantsService.delete(participantId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get('participants/:participantId/password')
  async regeneratePassword(@Param('participantId') participantId: string) {
    return this.participantsService.regeneratePassword(participantId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get('participants')
  async findParticipantsByStudy(@Param('studyId') studyId: string) {
    return this.participantsService.getByStudy(studyId);
  }
}
