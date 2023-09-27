import { SCHEDULES_REPOSITORY } from '@admin/groups/domain';
import { SchedulesRepository } from '@admin/groups/infrastructure/db';
import { Provider } from '@nestjs/common';

export const SchedulesRepositoryProvider: Provider = {
  provide: SCHEDULES_REPOSITORY,
  useClass: SchedulesRepository,
};
