import { FormSchedule } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSchedulesController } from './form-schedules.controller';
import formSchedulesProviders from './form-schedules.providers';
import { FormSchedulesRepository } from './form-schedules.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FormSchedule])],
  controllers: [FormSchedulesController],
  providers: formSchedulesProviders,
  exports: [FormSchedulesRepository],
})
export class FormSchedulesModule {}
