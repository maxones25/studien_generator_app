import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Inject,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { CreateParticipantDto } from '../dtos/CreateParticipantDto';
import { Roles } from '@admin/roles/roles.decorator';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { ParticipantGuard } from '../guards/participant.guard';
import { ChangeNumberDto } from '../dtos/ChangeNumberDto';
import { ChangeGroupDto } from '../dtos/ChangeGroupDto';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { StartStudyDto } from '../dtos/StartStudyDto';
import { Participant } from '../participant.decorator';
import { Participant as ParticipantEntity } from '@entities';
import { StudiesService } from '@admin/studies/studies/studies.service';
import { IsStudyActiveGuard } from '@admin/studies/studies/guards/IsStudyActiveGuard';
import { TasksCalculatorService } from '@admin/participants/tasks/services/task-calculator.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { SchedulesService } from '@admin/forms/configs/services/schedules.service';
import { TransformStartStudySchedulesGuard } from '../guards/TransformStartStudySchedulesGuard';

@Controller('participants')
export class ParticipantsCommands {
  constructor(
    @Inject(ParticipantsService)
    private readonly participantsService: ParticipantsService,
    @Inject(SchedulesService)
    private readonly schedulesService: SchedulesService,
    @Inject(TasksCalculatorService)
    private readonly tasksCalculatorService: TasksCalculatorService,
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
    @Inject(PasswordService)
    private readonly passwordService: PasswordService,
  ) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: CreateParticipantDto,
  ) {
    const password = await this.passwordService.generateHashed(10);
    return this.participantsService.create(studyId, password, body);
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
  @UseGuards(
    ParticipantGuard,
    IsStudyActiveGuard,
    TransformStartStudySchedulesGuard,
  )
  async startStudy(
    @Participant() participant: ParticipantEntity,
    @Query() { studyId }: StudyQueryDto,
    @Body() { startDate, configs }: StartStudyDto,
  ) {
    const schedules = await this.schedulesService.getActiveByGroup(
      participant.groupId,
    );

    const updatedSchedules = schedules.map((schedule) => {
      const updateSchedule = configs
        .flatMap((config) => config.schedules)
        .find((s) => s.id === schedule.id);
      if (!updateSchedule)
        throw new InternalServerErrorException('schedule not found');
      return {
        ...schedule,
        times: updateSchedule.times,
        daysOfWeek:
          schedule.type === 'Flexible'
            ? updateSchedule.daysOfWeek
            : schedule.daysOfWeek,
        daysOfMonth:
          schedule.type === 'Flexible'
            ? updateSchedule.daysOfMonth
            : schedule.daysOfMonth,
        frequency: schedule.type === 'Flexible' ? 1 : schedule.frequency,
      };
    });

    const duration = await this.studiesService.getDuration(studyId);

    const tasks = this.tasksCalculatorService.generate({
      participantId: participant.id,
      schedules: updatedSchedules,
      startDate,
      duration,
    });

    return this.participantsService.startStudy(
      participant.id,
      tasks,
      startDate,
    );
  }

  @Post('resetPassword')
  @Roles('admin')
  async resetPassword(@Query() { participantId }: ParticipantQueryDto) {
    const password = await this.passwordService.generateHashed(10);
    return this.participantsService.regeneratePassword(participantId, password);
  }
}
