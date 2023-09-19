import { Module } from '@nestjs/common';
import { GroupGuard } from './infrastructure/http/guards/group.guard';
import { GroupsService } from './application/groups.service';
import { IsGroupDeletedGuard } from './infrastructure/http/guards/IsGroupDeletedGuard';
import { AppointmentsModule } from '@admin/appointments/appointments.module';
import { CreateAppointmentUseCase } from './application/useCases/CreateAppointmentUseCase';
import { GroupsDb } from './infrastructure/db';
import { DeleteGroupTransaction, GetAppointmentsUseCase } from './application';
import { GroupsRepository } from './repositories/groups.repository';
import { AppointmentsRepository } from '@admin/appointments/appointment.repository';
import { CREATE_GROUP_USE_CASE, GROUPS_REPOSITORY } from './domain';
import { CreateGroupUseCaseProvider, GroupsRepositoryProvider } from './providers';

@Module({
  imports: [GroupsDb, AppointmentsModule],
  providers: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    GroupsRepository,
    DeleteGroupTransaction,
    GroupsRepositoryProvider,
    CreateGroupUseCaseProvider,
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
  ],
  exports: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    DeleteGroupTransaction,
    GetAppointmentsUseCase,
    CreateAppointmentUseCase,
    GROUPS_REPOSITORY,
    CREATE_GROUP_USE_CASE,
  ],
})
export class GroupsModule {}
