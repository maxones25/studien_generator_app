import { Module } from '@nestjs/common';
import providers from './configs.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FormConfiguration,
  FormSchedule,
  FormScheduleAttribute,
} from '@entities';
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
  exports: [SchedulesService],
})
export class ConfigsModule {}
