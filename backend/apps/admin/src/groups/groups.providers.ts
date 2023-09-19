import { Provider } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './repositories/groups.repository';
import { GroupGuard } from './infrastructure/http/guards/group.guard';
import { IsGroupDeletedGuard } from './infrastructure/http/guards/IsGroupDeletedGuard';
import { DeleteGroupTransaction } from './transactions/DeleteGroupTransaction';
import { GetAppointmentsUseCase } from './transactions/GetAppointmentsUseCase';
import { CreateAppointmentUseCase } from './transactions/CreateAppointmentUseCase';
import { AppointmentsRepository } from '@admin/appointments/appointment.repository';

const groupsProviders: Provider[] = [
  GroupGuard,
  IsGroupDeletedGuard,
  GroupsService,
  GroupsRepository,
  DeleteGroupTransaction,
  {
    provide: GetAppointmentsUseCase,
    useFactory(appointmentsRepository: AppointmentsRepository) {
      return new GetAppointmentsUseCase(appointmentsRepository);
    },
    inject: [AppointmentsRepository],
  },
  {
    provide: CreateAppointmentUseCase,
    useFactory(appointmentsRepository: AppointmentsRepository) {
      return new CreateAppointmentUseCase(appointmentsRepository);
    },
    inject: [AppointmentsRepository],
  },
];

export default groupsProviders;
