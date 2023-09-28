import { Schedule } from '@entities/core/group';
import { CreateDto } from '@entities/modules/core';
import { Id, UseCase } from '@shared/modules/core';

export const ADD_SCHEDULE_USE_CASE = 'ADD_SCHEDULE_USE_CASE';

export type AddScheduleUseCaseInput = {
  formConfigId: Id;
  data: Omit<CreateDto<Schedule>, 'configId' | 'config'>;
};

export interface IAddScheduleUseCase
  extends UseCase<AddScheduleUseCaseInput, Promise<Id>> {}
