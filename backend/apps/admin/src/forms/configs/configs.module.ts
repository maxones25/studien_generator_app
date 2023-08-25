import { Module } from '@nestjs/common';
import providers from './configs.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FormConfiguration,
  FormSchedule,
  FormScheduleAttribute,
} from '@entities';
import { ConfigGuard } from './guards/config.guard';
import { ConfigsRepository } from './repositories/configs.repository';
import { ConfigsService } from './services/configs.service';
import { SchedulesService } from './services/schedules.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FormConfiguration,
      FormSchedule,
      FormScheduleAttribute,
    ]),
  ],
  providers,
  exports: [ConfigGuard, ConfigsService, SchedulesService],
})
export class ConfigsModule {}
