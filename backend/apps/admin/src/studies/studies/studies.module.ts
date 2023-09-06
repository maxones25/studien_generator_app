import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment, Study } from '@entities';
import studiesProviders from './studies.providers';
import { StudyAttribute } from '@entities';
import { StudiesService } from './studies.service';
import { StudyGuard } from './guards/study.guard';
import { IsStudyActiveGuard } from './guards/IsStudyActiveGuard';
import { IsStudyDeletedGuard } from './guards/IsStudyDeletedGuard';
import { CreateAppointmentUseCase } from './transactions/CreateAppointmentUseCase';
import { GetAppointmentsUseCase } from './transactions/GetAppointmentsUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyAttribute, Appointment])],
  providers: studiesProviders,
  exports: [
    StudiesService,
    StudyGuard,
    IsStudyActiveGuard,
    IsStudyDeletedGuard,
    CreateAppointmentUseCase,
    GetAppointmentsUseCase,
  ],
})
export class StudiesModule {}
