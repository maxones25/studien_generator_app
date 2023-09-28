import { Module } from '@nestjs/common';
import { ParticipantsModule } from './participants.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { TasksModule } from '../tasks/tasks.module';
import { ParticipantsQueries } from './controllers/participants.queries';
import { ParticipantsCommands } from './controllers/participants.commands';
import { PasswordModule } from '@shared/modules/password/password.module';
import { GroupsModule } from '@admin/groups/groups.module';
import { AppointmentsCommands } from './controllers/appointments.commands';
import { AppointmentsQueries } from './controllers/appointments.queries';

@Module({
  imports: [
    ParticipantsModule,
    TasksModule,
    StudiesModule,
    PasswordModule,
    GroupsModule,
  ],
  controllers: [
    AppointmentsCommands,
    AppointmentsQueries,
    ParticipantsQueries,
    ParticipantsCommands,
  ],
})
export class ParticipantsApp {}
