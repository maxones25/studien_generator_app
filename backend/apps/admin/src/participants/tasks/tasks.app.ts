import { Module } from '@nestjs/common';
import { TasksModule } from './tasks.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { ParticipantsModule } from '../participants/participants.module';
import { TasksQueries } from './controllers/tasks.queries';

@Module({
  imports: [TasksModule, StudiesModule, ParticipantsModule],
  controllers: [TasksQueries],
})
export class TasksApp {}
