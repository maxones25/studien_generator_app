import { Schedule } from '@entities/core/group';
import { CreateDto } from '@entities/modules/core';
import { Id, UpdatedResult, UseCase } from '@shared/modules/core';

export const UPDATE_SCHEDULE_USE_CASE = 'UPDATE_SCHEDULE_USE_CASE';

export type UpdateScheduleUseCaseInput = {
  scheduleId: Id;
  data: Omit<CreateDto<Schedule>, 'configId' | 'config'>;
};

export interface IUpdateScheduleUseCase
  extends UseCase<UpdateScheduleUseCaseInput, Promise<UpdatedResult>> {}
