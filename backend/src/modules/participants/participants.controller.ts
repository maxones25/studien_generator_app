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
import { Roles } from '../../decorators/roles.decorator';
import { ParticipantGuard } from './guards/participant.guard';

@Controller('studies/:studyId')
@UseGuards(ParticipantGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post('participants')
  async create(
    @Param('studyId') studyId: string,
    @Body() participantDto: ParticipantDto,
  ) {
    return this.participantsService.create(studyId, participantDto);
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
  @Delete('participants/:participantId')
  async deleteParticipant(@Param('participantId') participantId: string) {
    this.participantsService.delete(participantId);
  }

  @Roles('admin')
  @Get('participants/:participantId/password')
  async regeneratePassword(@Param('participantId') participantId: string) {
    return this.participantsService.regeneratePassword(participantId);
  }
}
