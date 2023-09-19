import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@entities';
import groupsProviders from './groups.providers';
import { GroupGuard } from './infrastructure/http/guards/group.guard';
import { GroupsService } from './groups.service';
import { IsGroupDeletedGuard } from './infrastructure/http/guards/IsGroupDeletedGuard';
import { DeleteGroupTransaction } from './transactions/DeleteGroupTransaction';
import { AppointmentsModule } from '@admin/appointments/appointments.module';
import { GetAppointmentsUseCase } from './transactions/GetAppointmentsUseCase';
import { CreateAppointmentUseCase } from './transactions/CreateAppointmentUseCase';
import { GroupsDb } from './infrastructure/db';

@Module({
  imports: [GroupsDb, AppointmentsModule],
  providers: groupsProviders,
  exports: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    DeleteGroupTransaction,
    GetAppointmentsUseCase,
    CreateAppointmentUseCase,
  ],
})
export class GroupsModule {}
