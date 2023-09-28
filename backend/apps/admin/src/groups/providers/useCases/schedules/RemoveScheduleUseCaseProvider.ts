import { RemoveScheduleUseCase } from '@admin/groups/application';
import {
  REMOVE_SCHEDULE_USE_CASE,
  SCHEDULES_REPOSITORY,
  ISchedulesRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const RemoveScheduleUseCaseProvider: Provider = {
  provide: REMOVE_SCHEDULE_USE_CASE,
  useFactory(schedulesRepository: ISchedulesRepository) {
    return new RemoveScheduleUseCase(schedulesRepository);
  },
  inject: [SCHEDULES_REPOSITORY],
};
