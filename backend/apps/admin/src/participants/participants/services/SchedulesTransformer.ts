import { Inject, Injectable } from '@nestjs/common';
import { StartStudyConfig } from '../dtos/StartStudyDto';
import { InternalServerErrorException } from '@nestjs/common';
import {
  ISchedulesRepository,
  SCHEDULES_REPOSITORY,
} from '@admin/groups/domain';
import { Schedule } from '@entities/core/group';

@Injectable()
export class SchedulesTransformer {
  constructor(
    @Inject(SCHEDULES_REPOSITORY)
    private readonly schedulesRepository: ISchedulesRepository,
  ) {}

  async generateParticipantSchedules(
    groupId: string,
    configs: StartStudyConfig[],
  ) {
    const schedules = await this.schedulesRepository.getActiveSchedulesByGroup(
      groupId,
    );

    return schedules.map<Schedule>((schedule) => {
      const updateSchedule = configs
        .flatMap((config) => config.schedules)
        .find((s) => s.id === schedule.id);
      if (!updateSchedule)
        throw new InternalServerErrorException('schedule not found');
      return {
        ...schedule,
        isDeleted: schedule.deletedAt !== null,
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
  }
}
