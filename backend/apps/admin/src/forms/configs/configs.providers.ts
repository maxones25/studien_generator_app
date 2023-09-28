import { Provider } from '@nestjs/common';
import { SchedulesRepository } from './repositories/schedules.repository';
import { SchedulesService } from './services/schedules.service';
import { DeleteScheduleTransaction } from './transactions/DeleteScheduleTransaction';

const configsProviders: Provider[] = [
  SchedulesService,
  SchedulesRepository,
  DeleteScheduleTransaction,
];

export default configsProviders;
