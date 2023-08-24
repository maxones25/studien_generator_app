import { Module } from '@nestjs/common';
import { ParticipantsModule } from './participants.module';
import { FormSchedulesModule } from '@admin/groups/schedules/form-schedules.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { TasksModule } from '../tasks/tasks.module';
import { ParticipantsQueries } from './controllers/participants.queries';
import { ParticipantsCommands } from './controllers/participants.commands';
import { PasswordModule } from '@shared/modules/password/password.module';

@Module({
  imports: [
    ParticipantsModule,
    FormSchedulesModule,
    TasksModule,
    StudiesModule,
    PasswordModule,
  ],
  controllers: [ParticipantsQueries, ParticipantsCommands],
})
export class ParticipantsApp {}
