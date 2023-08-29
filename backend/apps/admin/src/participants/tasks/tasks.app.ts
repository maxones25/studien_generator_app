import { Module } from '@nestjs/common';
import { TasksModule } from './tasks.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { ParticipantsModule } from '../participants/participants.module';
import { TasksQueries } from './controllers/tasks.queries';
import { TasksCommands } from './controllers/tasks.commands';
import { FormsModule } from '@admin/forms/forms/forms.module';

@Module({
  imports: [TasksModule, StudiesModule, ParticipantsModule, FormsModule],
  controllers: [TasksQueries, TasksCommands],
})
export class TasksApp {}
