import { Module } from '@nestjs/common';
import { GroupsCommands } from './api/groups.commands';
import { GroupsQueries } from './api/groups.queries';
import { GroupsModule } from './groups.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { AppointmentsQueries } from './api/appointments.queries';
import { AppointmentsCommands } from './api/appointments.commands';

@Module({
  imports: [GroupsModule, StudiesModule],
  controllers: [
    AppointmentsCommands,
    AppointmentsQueries,
    GroupsCommands,
    GroupsQueries,
  ],
})
export class GroupsApp {}
