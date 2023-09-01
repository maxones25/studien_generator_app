import { SchedulesService } from '@admin/forms/configs/services/schedules.service';
import { Inject, Injectable } from '@nestjs/common';
import { StartStudyConfig } from '../dtos/StartStudyDto';
import { FormSchedule } from '@admin/forms/configs/repositories/schedules.repository';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SchedulesTransformer {
  constructor(
    @Inject(SchedulesService)
    private readonly schedulesService: SchedulesService,
  ) {}

  async generateParticipantSchedules(
    groupId: string,
    configs: StartStudyConfig[],
  ) {
    const schedules = await this.schedulesService.getActiveByGroup(groupId);

    return schedules.map<FormSchedule>((schedule) => {
      const updateSchedule = configs
        .flatMap((config) => config.schedules)
        .find((s) => s.id === schedule.id);
      if (!updateSchedule)
        throw new InternalServerErrorException('schedule not found');
      return {
        ...schedule,
        isDeleted: schedule.isDeleted,
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
