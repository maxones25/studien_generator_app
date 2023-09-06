import { Module } from '@nestjs/common';
import { GroupsCommands } from './controllers/groups.commands';
import { GroupsQueries } from './controllers/groups.queries';
import { GroupsModule } from './groups.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { AppointmentsQueries } from './controllers/appointments.queries';
import { AppointmentsCommands } from './controllers/appointments.commands';

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
