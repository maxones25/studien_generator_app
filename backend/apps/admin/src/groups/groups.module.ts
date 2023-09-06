import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@entities';
import groupsProviders from './groups.providers';
import { GroupGuard } from './guards/group.guard';
import { GroupsService } from './groups.service';
import { IsGroupDeletedGuard } from './guards/IsGroupDeletedGuard';
import { DeleteGroupTransaction } from './transactions/DeleteGroupTransaction';
import { AppointmentsModule } from '@admin/appointments/appointments.module';
import { GetAppointmentsUseCase } from './transactions/GetAppointmentsUseCase';
import { CreateAppointmentUseCase } from './transactions/CreateAppointmentUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), AppointmentsModule],
  providers: groupsProviders,
  exports: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    DeleteGroupTransaction,
    GetAppointmentsUseCase,
    CreateAppointmentUseCase
  ],
})
export class GroupsModule {}
