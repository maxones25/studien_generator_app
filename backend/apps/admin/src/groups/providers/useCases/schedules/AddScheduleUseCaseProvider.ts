import { AddScheduleUseCase } from '@admin/groups/application';
import {
  ADD_SCHEDULE_USE_CASE,
  SCHEDULES_REPOSITORY,
  ISchedulesRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const AddScheduleUseCaseProvider: Provider = {
  provide: ADD_SCHEDULE_USE_CASE,
  useFactory(schedulesRepository: ISchedulesRepository) {
    return new AddScheduleUseCase(schedulesRepository);
  },
  inject: [SCHEDULES_REPOSITORY],
};
