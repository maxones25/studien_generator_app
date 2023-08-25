import { Module } from '@nestjs/common';
import { ParticipantsModule } from './participants.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { TasksModule } from '../tasks/tasks.module';
import { ParticipantsQueries } from './controllers/participants.queries';
import { ParticipantsCommands } from './controllers/participants.commands';
import { PasswordModule } from '@shared/modules/password/password.module';
import { ConfigsModule } from '@admin/forms/configs/configs.module';

@Module({
  imports: [
    ParticipantsModule,
    ConfigsModule,
    TasksModule,
    StudiesModule,
    PasswordModule,
  ],
  controllers: [ParticipantsQueries, ParticipantsCommands],
})
export class ParticipantsApp {}
