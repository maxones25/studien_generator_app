import { Provider } from '@nestjs/common';
import { FormSchedulesService } from './form-schedules.service';
import { FormSchedulesRepository } from './form-schedules.repository';
import { FormSchedule } from '@entities';
import { EntityManager } from 'typeorm';
import { DeleteScheduleTransaction } from './transactions/DeleteScheduleTransaction';

const formSchedulesProviders: Provider[] = [
  FormSchedulesService,
  DeleteScheduleTransaction,
  {
    provide: FormSchedulesRepository,
    useFactory: (entityManager) =>
      new FormSchedulesRepository(FormSchedule, entityManager),
    inject: [EntityManager],
  },
];

export default formSchedulesProviders;
