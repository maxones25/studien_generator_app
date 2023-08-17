import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dtos/CreateParticipantDto';
import { Roles } from '@admin/roles/roles.decorator';
import { ParticipantQueryDto } from './dtos/ParticipantQueryDto';
import { ParticipantGuard } from './participant.guard';
import { ChangeNumberDto } from './dtos/ChangeNumberDto';
import { ChangeGroupDto } from './dtos/ChangeGroupDto';

@Controller('studies/:studyId')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post('participants')
  @Roles('admin', 'employee')
  async create(
    @Param('studyId') studyId: string,
    @Body() body: CreateParticipantDto,
  ) {
    return this.participantsService.create(studyId, body);
  }

  @Get('participants')
  @Roles('admin', 'employee')
  async findParticipantsByStudy(@Param('studyId') studyId: string) {
    return this.participantsService.getByStudy(studyId);
  }

  @Get('participant')
  @Roles('admin', 'employee')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async getParticipant(@Query() { participantId }: ParticipantQueryDto) {
    return this.participantsService.getById(participantId);
  }

  @Post('changeParticipantNumber')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async changeNumber(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { number }: ChangeNumberDto,
  ) {
    return await this.participantsService.changeNumber(participantId, number);
  }

  @Post('changeParticipantGroup')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async changeGroup(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { groupId }: ChangeGroupDto,
  ) {
    return await this.participantsService.changeGroup(participantId, groupId);
  }

  @Post('deleteParticipant')
  @Roles('admin')
  @UseGuards(ParticipantGuard)
  async delete(@Query() { participantId }: ParticipantQueryDto) {
    return await this.participantsService.delete(participantId);
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
