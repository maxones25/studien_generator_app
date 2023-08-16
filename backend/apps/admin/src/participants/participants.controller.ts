import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantDto } from './dtos/participantDto';
import { ParticipantGuard } from './guards/participant.guard';
import { Roles } from '@admin/roles/roles.decorator';

@Controller('studies/:studyId')
@UseGuards(ParticipantGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post('participants')
  async create(
    @Param('studyId') studyId: string,
    @Body() body: ParticipantDto,
  ) {
    return this.participantsService.create(studyId, body);
  }

  @Get('participants')
  async findParticipantsByStudy(@Param('studyId') studyId: string) {
    return this.participantsService.getByStudy(studyId);
  }

  @Put('participants/:participantId')
  async update(
    @Param('participantId') participantId: string,
    @Body() updateParticipant: ParticipantDto,
  ) {
    return this.participantsService.update(participantId, updateParticipant);
  }

  @Roles('admin')
  @Post('participants/:participantId/start')
  async start(@Param('participantId') participantId: string) {
    return this.participantsService.regeneratePassword(participantId);
  }

  @Roles('admin')
  @Delete('participants/:participantId')
  async deleteParticipant(@Param('participantId') participantId: string) {
    this.participantsService.delete(participantId);
  }

  @Roles('admin')
  @Get('participants/:participantId/resetPassword')
  async regeneratePassword(@Param('participantId') participantId: string) {
    return this.participantsService.regeneratePassword(participantId);
  }
}
