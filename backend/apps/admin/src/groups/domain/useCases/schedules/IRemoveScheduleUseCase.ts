import { DeletedResult, Id, UseCase } from '@shared/modules/core';

export const REMOVE_SCHEDULE_USE_CASE = 'REMOVE_SCHEDULE_USE_CASE';

export type RemoveScheduleUseCaseInput = {
  scheduleId: Id;
};

export interface IRemoveScheduleUseCase
  extends UseCase<RemoveScheduleUseCaseInput, Promise<DeletedResult>> {}
