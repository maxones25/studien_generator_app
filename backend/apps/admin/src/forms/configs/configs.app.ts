import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs.module';
import { SchedulesCommands } from './controllers/schedules.commands';
import { StudiesModule } from '@admin/studies/studies/studies.module';

@Module({
  imports: [ConfigsModule, StudiesModule],
  controllers: [SchedulesCommands],
})
export class ConfigsApp {}
