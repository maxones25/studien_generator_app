import { Module } from '@nestjs/common';
import { ParticipantsQueries } from './controllers/participants.queries';
import { ParticipantsCommands } from './controllers/participants.commands';
import { ParticipantsModule } from './participants.module';
import { FormSchedulesModule } from '@admin/groups/schedules/form-schedules.module';
import { TasksModule } from '@admin/tasks/tasks.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';

@Module({
  imports: [
    ParticipantsModule,
    FormSchedulesModule,
    TasksModule,
    StudiesModule,
  ],
  controllers: [ParticipantsQueries, ParticipantsCommands],
})
export class ParticipantsApp {}
