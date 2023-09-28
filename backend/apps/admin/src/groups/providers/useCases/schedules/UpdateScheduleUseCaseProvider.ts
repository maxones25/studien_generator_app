import { UpdateScheduleUseCase } from '@admin/groups/application';
import {
  UPDATE_SCHEDULE_USE_CASE,
  ISchedulesRepository,
  SCHEDULES_REPOSITORY,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const UpdateScheduleUseCaseProvider: Provider = {
  provide: UPDATE_SCHEDULE_USE_CASE,
  useFactory(schedulesRepository: ISchedulesRepository) {
    return new UpdateScheduleUseCase(schedulesRepository);
  },
  inject: [SCHEDULES_REPOSITORY],
};
