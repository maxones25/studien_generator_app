import { Schedule } from '@entities/core/group';
import { Id } from '@shared/modules/core';

export const SCHEDULES_REPOSITORY = 'SCHEDULES_REPOSITORY';

export interface ISchedulesRepository {
  removeSchedule(scheduleId: string): Promise<number>;
  getStudyRelatedSchedule(studyId: string, id: string): Promise<Schedule>;
  updateSchedule(schedule: Schedule): Promise<number>;
  addSchedule(schedule: Schedule): Promise<Id>;
}
