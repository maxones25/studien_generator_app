import { Provider } from '@nestjs/common';
import { ConfigsService } from './services/configs.service';
import { ConfigsRepository } from './repositories/configs.repository';
import { ConfigGuard } from './guards/config.guard';
import { DeleteScheduleTransaction } from './transactions/DeleteScheduleTransaction';
import { UpdateScheduleTransaction } from './transactions/UpdateScheduleTransaction';
import { CreateScheduleTransaction } from './transactions/CreateScheduleTransaction';
import { SchedulesRepository } from './repositories/schedules.repository';
import { SchedulesService } from './services/schedules.service';

const configsProviders: Provider[] = [
  ConfigGuard,
  ConfigsService,
  SchedulesService,
  SchedulesRepository,
  ConfigsRepository,
  CreateScheduleTransaction,
  UpdateScheduleTransaction,
  DeleteScheduleTransaction,
];

export default configsProviders;
