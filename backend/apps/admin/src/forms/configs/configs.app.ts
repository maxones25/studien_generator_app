import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs.module';
import { SchedulesCommands } from './controllers/schedules.commands';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { ConfigsQueries } from './controllers/configs.queries';
import { GroupsModule } from '@admin/groups/groups.module';
import { ConfigsCommands } from './controllers/configs.commands';
import { FormsModule } from '../forms/forms.module';

@Module({
  imports: [ConfigsModule, StudiesModule, GroupsModule, FormsModule],
  controllers: [SchedulesCommands, ConfigsCommands, ConfigsQueries],
})
export class ConfigsApp {}
