import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { CreateParticipantDto } from '../dtos/CreateParticipantDto';
import { Roles } from '@admin/roles/roles.decorator';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { ParticipantGuard } from '../participant.guard';
import { ChangeNumberDto } from '../dtos/ChangeNumberDto';
import { ChangeGroupDto } from '../dtos/ChangeGroupDto';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { StartStudyDto } from '../dtos/StartStudyDto';
import { Participant } from '../participant.decorator';
import { Participant as ParticipantEntity } from '@entities';
import { TasksCalculatorService } from '@admin/tasks/task-calculator.service';
import { FormSchedulesService } from '@admin/groups/schedules/form-schedules.service';
import { StudiesService } from '@admin/studies/studies/studies.service';
import { IsStudyActiveGuard } from '@admin/studies/studies/guards/IsStudyActiveGuard';

@Controller('participants')
export class ParticipantsCommands {
  constructor(
    @Inject(ParticipantsService)
    private readonly participantsService: ParticipantsService,
    @Inject(FormSchedulesService)
    private readonly scheduleService: FormSchedulesService,
    @Inject(TasksCalculatorService)
    private readonly tasksCalculatorService: TasksCalculatorService,
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
  ) {}

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
  @UseGuards(ParticipantGuard, IsStudyActiveGuard)
  async startStudy(
    @Participant() participant: ParticipantEntity,
    @Query() { studyId }: StudyQueryDto,
    @Body() body: StartStudyDto,
  ) {
    const startDate = new Date(body.startDate);

    const schedules = await this.scheduleService.getActiveByGroup(
      participant.groupId,
    );

    if (schedules.length === 0)
      throw new BadRequestException('no active schedules');

    const duration = await this.studiesService.getDuration(studyId);

    const tasks = this.tasksCalculatorService.generate({
      participantId: participant.id,
      schedules,
      startDate,
      duration,
    });

    return this.participantsService.startStudy(participant.id, tasks, body);
  }

  @Post('resetPassword')
  @Roles('admin')
  async resetPassword(@Query() { participantId }: ParticipantQueryDto) {
    return this.participantsService.regeneratePassword(participantId);
  }
}
