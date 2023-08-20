import { FormSchedule } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSchedulesController } from './form-schedules.controller';
import formSchedulesProviders from './form-schedules.providers';
import { FormSchedulesRepository } from './form-schedules.repository';
import { FormSchedulesService } from './form-schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormSchedule])],
  controllers: [FormSchedulesController],
  providers: formSchedulesProviders,
  exports: [FormSchedulesRepository, FormSchedulesService],
})
export class FormSchedulesModule {}
