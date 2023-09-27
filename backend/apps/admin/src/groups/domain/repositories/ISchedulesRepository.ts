import { Schedule } from '@entities/core/group';
import { Id } from '@shared/modules/core';

export const SCHEDULES_REPOSITORY = 'SCHEDULES_REPOSITORY';

export interface ISchedulesRepository {
  addSchedule(schedule: Schedule): Promise<Id>;
}
