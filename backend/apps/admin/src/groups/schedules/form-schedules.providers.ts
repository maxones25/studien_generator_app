import { Provider } from '@nestjs/common';
import { FormSchedulesService } from './form-schedules.service';
import { FormSchedulesRepository } from './form-schedules.repository';
import { DeleteScheduleTransaction } from './transactions/DeleteScheduleTransaction';
import { CreateScheduleTransaction } from './transactions/CreateScheduleTransaction';
import { UpdateScheduleTransaction } from './transactions/UpdateScheduleTransaction';

const formSchedulesProviders: Provider[] = [
  FormSchedulesService,
  FormSchedulesRepository,
  CreateScheduleTransaction,
  UpdateScheduleTransaction,
  DeleteScheduleTransaction,
];

export default formSchedulesProviders;
