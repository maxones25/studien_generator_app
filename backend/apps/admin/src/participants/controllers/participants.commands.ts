import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { CreateParticipantDto } from '../dtos/CreateParticipantDto';
import { Roles } from '@admin/roles/roles.decorator';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { ParticipantGuard } from '../participant.guard';
import { ChangeNumberDto } from '../dtos/ChangeNumberDto';
import { ChangeGroupDto } from '../dtos/ChangeGroupDto';
import { StudyQueryDto } from '@admin/studies/dtos/StudyQueryDto';
import { StartStudyDto } from '../dtos/StartStudyDto';

@Controller('participants')
export class ParticipantsCommands {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: CreateParticipantDto,
  ) {
    return this.participantsService.create(studyId, body);
  }

  @Post('changeNumber')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async changeNumber(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { number }: ChangeNumberDto,
  ) {
    return await this.participantsService.changeNumber(participantId, number);
  }

  @Post('changeGroup')
  @Roles('admin', 'employee')
  @UseGuards(ParticipantGuard)
  async changeGroup(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() { groupId }: ChangeGroupDto,
  ) {
    return await this.participantsService.changeGroup(participantId, groupId);
  }

  @Post('delete')
  @Roles('admin')
  @UseGuards(ParticipantGuard)
  async delete(@Query() { participantId }: ParticipantQueryDto) {
    return await this.participantsService.delete(participantId);
  }

  @Post('startStudy')
  @Roles('admin')
  async startStudy(
    @Query() { participantId }: ParticipantQueryDto,
    @Query() { studyId }: StudyQueryDto,
    @Body() body: StartStudyDto
  ) {
    return this.participantsService.startStudy(studyId, participantId, body);
  }

  @Post('resetPassword')
  @Roles('admin')
  async resetPassword(@Query() { participantId }: ParticipantQueryDto) {
    return this.participantsService.regeneratePassword(participantId);
  }
}
